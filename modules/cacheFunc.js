const cacheFunc = {
    makeCache: (numSets) => {
        var cache = new Array(numSets), i, l;
        for (i=0, l=numSets; i<l; i++) {
            cache[i] = {
                MRU: null,
                cache: new Array()
            };
        }
        return cache;
    }
};

module.exports = cacheFunc;

