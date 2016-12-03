import { createSelector } from 'reselect';

const reposSelector = state => state.data.repos;
const likedSelector = state => state.data.likedIds;

const getNewRelease = (repos, likedIds) => {
    const newRelease = repos.map(item => {
        return {
            ...item,
            liked: (likedIds.indexOf(item.repo) !== -1)
        }
    }).sort((a, b) => {
        return parseInt(b.timestamp) - parseInt(a.timestamp);
    });

    return newRelease;
}

export default createSelector(
    reposSelector,
    likedSelector,
    getNewRelease
);