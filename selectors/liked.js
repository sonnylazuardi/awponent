import { createSelector } from 'reselect';

const reposSelector = state => state.data.repos;
const likedSelector = state => state.data.likedIds;

const getLiked = (repos, likedIds) => {
    const liked = repos.filter(item => {
        return likedIds.indexOf(item.repo) !== -1;
    }).map(item => ({...item, liked: true}));

    return liked;
}

export default createSelector(
    reposSelector,
    likedSelector,
    getLiked
);