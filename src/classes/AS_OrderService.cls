public without sharing class AS_OrderService {

    @AuraEnabled
    public static String getContactId() {
        return AS_UserService.getLoggedUserContactId();
    }

    public static pricebook2 getStandardPricebook() {
        return [select id from pricebook2 where Name = 'Standard'];
    }

    @AuraEnabled
    public static Order createNewOrder() {
        Id contactId = getContactId();
        date newDate = date.today();

        Order newOrder = new Order(BillToContactId = contactId, Status = 'Draft',
                AccountId = '0010900000B1MnrAAF', EffectiveDate = newDate, Pricebook2Id = getStandardPricebook().Id);

        upsert newOrder;
        return newOrder;
    }

    @AuraEnabled
    public static Order getBasketOrder() {

        Id contactId = getContactId();

        Order basketOrder;

        try {
            basketOrder = [
                    SELECT Id, Status, OrderNumber
                    FROM Order
                    WHERE BillToContactId = :contactId
                    AND Status = 'Draft'
                    ORDER BY CreatedDate DESC
                    LIMIT 1
            ];
        } catch (Exception e) {
            System.debug('EXCEPTION --->>>> ' + e.getMessage());

            createNewOrder();

            basketOrder = [
                    SELECT Id, Status, OrderNumber
                    FROM Order
                    WHERE BillToContactId = :contactId
                    AND Status = 'Draft'
                    ORDER BY CreatedDate DESC
                    LIMIT 1
            ];

            System.debug('???????????????????????????? ---- basketOrder ---- ' + basketOrder.OrderNumber);
        }

        System.debug('BASKET OrderNumber =====>>>>> ' + basketOrder.OrderNumber);
        return basketOrder;
    }


    //Get CLOSED ORDERS
    @AuraEnabled
    public static List<Order> getClosedOrders() {

        Id contactId = getContactId();
        List<Order> basketOrders;

        try {
            basketOrders = [
                    SELECT Id, Status, OrderNumber, ActivatedDate
                    FROM Order
                    WHERE BillToContactId = :contactId
                    AND Status = 'Activated'
                    ORDER BY CreatedDate DESC
                    LIMIT 5
            ];
        } catch (Exception e) {
            System.debug('EXCEPTION --->>>> ' + e.getMessage());
        }

        return basketOrders;
    }











    @AuraEnabled
    public static List<OrderItemWrapper> getBasketItems() {

        List<OrderItemWrapper> wrappers = new List<OrderItemWrapper>();

        Order basketOrder = getBasketOrder();

        List<OrderItem> basketItems = [
                SELECT Id, Product2Id, Product2.Name, Quantity, ListPrice
                FROM OrderItem
                WHERE OrderId = :basketOrder.Id
        ];

        if (basketItems == null || basketItems.isEmpty()) {
            return wrappers;
        } else {
            for (OrderItem item : basketItems) {
                wrappers.add(new OrderItemWrapper(item));
            }
        }

        return wrappers;
    }

    @AuraEnabled
    public static void updateOrderItem(Id orderItemId, Decimal quantity) {
        OrderItem orderItem = new OrderItem(Id = orderItemId, Quantity = quantity);
        try {
            update orderItem;
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }

    }

    @AuraEnabled
    public static void removeItemFromOrder(String productId) {

        Order basketOrder = getBasketOrder();

        List<OrderItem> items = [
                select Id,
                        Product2Id,
                        Product2.Name
                from OrderItem
                where OrderId = :basketOrder.Id
        ];
        for (OrderItem item : items) {
            if (item.Product2Id.equals(productId)) {
                delete item;
            }
        }
    }

    @AuraEnabled
    public static String addProductToBasket(String productId, String unitPrice) {

        Boolean alreadyInBasket = false;

        Order basketOrder = getBasketOrder();
        System.debug('>>>>>>>>>>>>>>> basketOrder >>>>>> ' + basketOrder);


        List<OrderItem> items  = [
                select Id,
                        Product2Id,
                        Product2.Name
                from OrderItem
                where OrderId = :basketOrder.Id
        ];

        for (OrderItem item : items) {
            if (item.Product2Id.equals(productId)) {
                alreadyInBasket = true;
                return 'Product is already in basket';
            }
        }

        if (!alreadyInBasket) {
            System.debug('NO PRODUCT IN BASKET !!!');
            PricebookEntry myPricebookEntry = [select id, UnitPrice from PricebookEntry where Product2Id = :productId and Pricebook2.Name = 'Standard'];
            OrderItem myOrderItem = new OrderItem(Product2Id = productId, OrderId = basketOrder.Id, Quantity = 1, PricebookEntryId = myPricebookEntry.Id, UnitPrice = Decimal.valueOf(unitPrice));
            System.debug('>>>>>>>>>>>>>>> myOrderItem >>>>>>>>>>>>> ' + myOrderItem);
            upsert myOrderItem;
            return 'OK';
        }
        return 'Something wrong, contact Admin';
    }

    private class OrderItemWrapper {

        @auraEnabled
        public String productName { get; set; }

        @auraEnabled
        public String orderItemId { get; set; }

        @auraEnabled
        public String productId { get; set; }

        @auraEnabled
        public Decimal quantity { get; set; }

        @auraEnabled
        public Decimal price { get; set; }

        @auraEnabled
        public Decimal amount { get; set; }

        public OrderItemWrapper(OrderItem item) {
            this.orderItemId = item.Id;
            this.productId = item.Product2Id;
            this.productName = item.Product2.Name;
            this.quantity = item.Quantity;
            this.price = item.ListPrice;
            this.amount = (this.quantity * this.price).setScale(2);
        }

        public OrderItemWrapper(String productName, String productId, Decimal price) {
            this.productName = productName;
            this.productId = productId;
            this.price = price;
        }

    }

    @AuraEnabled
    public static Decimal countTotalAmount() {
        Decimal sum = 0;

        Order basketOrder = getBasketOrder();

        List<OrderItem> items = [
                select Id,
                        ListPrice,
                        Quantity
                from OrderItem
                where OrderId = :basketOrder.Id
        ];

        if (items.isEmpty() || items == null) {
            return 0;
        }

        for (OrderItem item : items) {
            sum += (item.Quantity * item.ListPrice);
        }

        return sum.setScale(2, RoundingMode.HALF_UP);
    }

    @AuraEnabled
    public static void closeOrder() {

        Order oldOrder = getBasketOrder();

        System.debug('*************** --------- oldOrder >>> ' + oldOrder.OrderNumber);

        oldOrder.Status = 'Activated';
        upsert oldOrder;
        createNewOrder();
    }

}