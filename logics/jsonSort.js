const afterSort = function GetSortOrder(value) {    
    return function(a, b) {    
        if (a[value] < b[value]) {    
            return 1;    
        } else if (a[value] > b[value]) {    
            return -1;    
        }    
        return 0;    
    }    
} 
module.exports = afterSort