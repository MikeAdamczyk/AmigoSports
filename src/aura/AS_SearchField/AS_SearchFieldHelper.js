({
    handleKeyUp: function (component, event) {
        let isEnterKey = event.keyCode === 13;

        if (isEnterKey) {

            let urlEvent = $A.get("e.force:navigateToURL");
                urlEvent.setParams({
                    "url": "/s",
                });

            urlEvent.fire();

            let query = component.find('enter-search').get('v.value');

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