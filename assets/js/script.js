(function ( $ ) {

    // Return css var value for an native DOM object and jQuery object

    function getCssVarValue(elem,name) {
        if(elem instanceof jQuery) {
            return getComputedStyle($(elem).get(0)).getPropertyValue(name);
        } else {
            return getComputedStyle(elem).getPropertyValue(name);
        }
    }

    function setCssVarValue(elem,name,value) {
        if(elem instanceof jQuery) {
            return $(elem).get(0).style.setProperty(name, value);
        } else {
            return elem.style.setProperty(name, value);
        }
    }

    // Collection

    $('.collection').each(function(i,e){

        // Determine the nested depth inside other collapsible collection

        let depth = $(this).parents('.collection').length;

        if(depth) {
            setCssVarValue(e,'--nested-depth',depth + 1)
        }

        // On click on <a> element start collapse adding .active class

        $(this).find('> li.collapsible > a').click(function(){
            $(this).toggleClass('active');
        })

        // Determine the total number of items inside .collapsible element,
        // then save into css var --childrens for track actual active childs
        // and --base-childrens for keep initial value

        $(this).find('> li.collapsible > a + ul').each(function(i,e){
            let childs = $(this).children().length;
    
            if(childs) {
                setCssVarValue(e,'--childrens',childs);
                setCssVarValue(e,'--base-childrens',childs);
            }
        })

        // On click determine total number of .active elements that needs to
        // be visible, then update --childrens var to set properly height

        $(this).click(function(){
            let targetEle = $(this);
            let baseChilds = getCssVarValue(targetEle,'--base-childrens');
            let activeChildsCount = parseInt(baseChilds);

            if(activeChildsCount){
                setCssVarValue(targetEle,'--childrens',activeChildsCount)
            }
    
            $(this).find('> li.collapsible > a.active + ul').each(function(i,e){
                activeChildsCount += parseInt(getCssVarValue(e,'--childrens'));
    
                if(activeChildsCount){
                    setCssVarValue(targetEle,'--childrens',activeChildsCount)
                }
            })
        })
    })

}( jQuery ))