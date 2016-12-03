import { createSelector } from 'reselect';

const reposSelector = state => state.data.repos;
const likedSelector = state => state.data.likedIds;
const searchSelector = state => state.data.searchText;

const getSearch = (repos, likedIds, searchText) => {
    const search = repos.filter(item => {
            return (
                item.repo && item.repo.toLowerCase().indexOf(searchText.toLowerCase()) != -1 ||
                item.name && item.name.toLowerCase().indexOf(searchText.toLowerCase()) != -1 ||
                item.author && item.author.username.toLowerCase().indexOf(searchText.toLowerCase()) != -1 ||
                item.author && item.author.name.toLowerCase().indexOf(searchText.toLowerCase()) != -1 ||
                item.description && item.description.toLowerCase().indexOf(searchText.toLowerCase()) != -1 ||
                item.exponentUrl && item.exponentUrl.toLowerCase().indexOf(searchText.toLowerCase()) != -1
            );
        })
        .map(item => {
            return {
                ...item,
                liked: (likedIds.indexOf(item.repo) !== -1)
            }
        });

    return search;
}

export default createSelector(
    reposSelector,
    likedSelector,
    searchSelector,
    getSearch
);