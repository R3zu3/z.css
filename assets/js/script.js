(function ( $ ) {

    function getCssVarValue(elem,name) {
        if(elem instanceof jQuery) {
            return getComputedStyle($(elem).get(0)).getPropertyValue(name);
        } else {
            return getComputedStyle(elem).getPropertyValue(name);
        }
    }

    // Collection

    $('.collection').each(function(i,e){
        $(this).click(function(){
            let targetEle = $(this);
            let baseChilds = getCssVarValue(targetEle,'--base-childrens');
            let activeChildsCount = parseInt(baseChilds);
    
            $(targetEle).get(0).style.setProperty('--childrens', activeChildsCount);
    
            $(this).find('> li.collapsible > a.active + ul').each(function(i,e){
                activeChildsCount += parseInt(getCssVarValue(e,'--childrens'));
    
                if(activeChildsCount){
                    $(targetEle).get(0).style.setProperty('--childrens', activeChildsCount);
                }
            })
        })
    
        $(this).find('> li.collapsible > a + ul').each(function(i,e){
            let childs = $(this).children().length;
    
            if(childs) {
                e.style.setProperty("--childrens", childs);
                e.style.setProperty("--base-childrens", childs); 
            }
        })
    
        $(this).find('> li.collapsible > a').click(function(){
            $(this).toggleClass('active');
        })
    })

}( jQuery ))