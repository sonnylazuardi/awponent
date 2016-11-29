/**
 * Created by ggoma on 2016. 11. 29..
 */
export function differenceBetween (featured, liked) {
    // console.log('featured', featured);
    // console.log('liked', liked);

    let f = cloneObject(featured),
        l = cloneObject(liked);
    for (var i = 0, len = l.length; i < len; i++) {
        for (var j = 0, len2 = f.length; j < len2; j++) {
            if (l[i].repo == f[j].repo) {
                console.log('deleting here');
                f.splice(j, 1);
                len2 = f.length;
            }
        }
    }
    //first one gets returned;
    // console.log('returning', f);
    return f
}

function cloneObject(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    var temp = obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) {
        temp[key] = cloneObject(obj[key]);
    }

    return temp;
}
