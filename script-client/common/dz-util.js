'use strict';

module.exports = {
    randomIntRange: function(min,max) {
        return Math.floor(Math.random() * (+max - +min + 1)) + +min ;
    },
    pickInArray: function(arr) {
        return arr[this.randomIntRange(0,arr.length-1)];
    },
    pickInObject: function(obj) { // Return random property name from object
        return this.pickInArray(Object.keys(obj));
    },
    removeFromArray: function(elem, arr, full) {
        for(var i = 0; i < arr.length; i++) {
            if(arr[i] === elem) { 
                arr.splice(i, 1);
                if(!full) return;
                i--;
            }
        }
    },
    removeEmptyIndexes: function(arr) {
        for(var i = 0; i < arr.length; i++) {
            if(arr[i] === undefined) {
                arr.splice(i, 1);
                i--;
            }
        }
    },
    mergeObjects: function(a, b, newObject) { // Merge/overwrite object B into object A
        var returnObj = newObject ? {} : a;
        if(newObject) {
            for(var aKey in a) { // Apply custom data
                if(!a.hasOwnProperty(aKey)) continue;
                returnObj[aKey] = a[aKey];
            }
        }
        for(var bKey in b) { // Apply custom data
            if(!b.hasOwnProperty(bKey)) continue;
            returnObj[bKey] = b[bKey];
        }
        return returnObj;
    },
    right: function(text, length) { return text.substring(text.length-length,text.length); },
    clamp: function(val, min, max) { return Math.min(max,Math.max(min,val)); },
    clampWrap: function(val, min, max) { // Clamp to range by wrapping value
        var wrap = (val-min) % (max+1-min);
        return wrap >= 0 ? min + wrap : max + 1 + wrap;
    },
    fractionalArrayIndex: function(arr, index) {
        var floorX = Math.floor(index);
        var lower = arr[floorX];
        if(floorX == index) return lower;
        var upper = arr[Math.ceil(index)];
        var fraction = index - Math.floor(index);
        return (lower + ((upper - lower) * fraction)); 
    },
    getURLParameter: function(name) {
        return decodeURIComponent(
                (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)')
                    .exec(location.search)||[,""])[1].replace(/\+/g, '%20')) || null
    },
    abbreviate: function(text,blacklist) {
        var split = text.split(' ');
        var alpha = /[a-z0-9]/i;
        var result = '';
        for(var w = 0; w < split.length; w++) {
            for(var l = 0; l < split[w].length; l++) {
                if(alpha.test(split[w][l])) {
                    result += split[w][l];
                    break;
                }
            }
        }
        if(blacklist && blacklist.indexOf(result) >= 0) {
            var variation = 1;
            result += variation;
            do {
                variation++;
                result = result.substring(0,result.length-1) + variation;
            } while (blacklist.indexOf(result) >= 0)
        }
        return result;
    },
    shuffleArray: function(arr) {
        var currentIndex = arr.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = arr[currentIndex];
            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = temporaryValue;
        }
        return arr;
    },
    alphabet: ['a','b','c','d','e','f','g','h','i','j','k','l','m',
        'n','o','p','q','r','s','t','u','v','w','x','y','z'],
    vowels: ['a','e','i','o','u'],
    consonants: ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z'],
    hex: ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']
};