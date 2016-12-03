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

export function featuredWithLiked(featured, liked) {
    return featured.map(featuredItem => {
        var likedFound = liked.filter(likedItem => likedItem.repo === featuredItem.repo).length > 0;
        if (likedFound) {
            return {...featuredItem, liked: true}
        } else {
            return {...featuredItem, liked: false}
        }
    });
}

export function includes(array, object) {
    var found = false;
    for(var i = 0; i < array.length; i++) {
        if (array[i].repo == object.repo) {
            found = true;
            break;
        }
    }
    return found;
}

export function unique(liked) {
    return liked.filter((item, index, items) => 
        items.indexOf(item) === index);
}

export function without(liked, repo) {
    return liked.filter(item => item !== repo);
}