import { createSelector } from 'reselect';

const reposSelector = state => state.data.repos;
const likedSelector = state => state.data.likedIds;

const getFeatured = (repos, likedIds) => {
    const featured = repos.map(item => {
        return {
            ...item,
            liked: (likedIds.indexOf(item.repo) !== -1)
        }
    }).sort((a, b) => {
        if (a.tag == 'featured' && b.tag != 'featured') {
            return -1;
        } else if (a.tag != 'featured' && b.tag == 'featured') {
            return 1;
        }  else {
            return 0;
        }
    });

    return featured;
}

export default createSelector(
    reposSelector,
    likedSelector,
    getFeatured
);