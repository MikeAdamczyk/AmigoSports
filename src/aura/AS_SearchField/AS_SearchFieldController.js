({
        handleKeyUp: function (component, event) {
            var isEnterKey = event.keyCode === 13;

            if (isEnterKey) {
                var query = component.find('enter-search').get('v.value');

                if (query != "") {

                    let searchEvent = $A.get("e.c:AS_Query");
                    searchEvent.setParams({
                        "query" : query,
                        "context" : 'search',
                    });
                    searchEvent.fire();
                }
            }
        }
})