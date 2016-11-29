/**
 * Created by ggoma on 2016. 11. 28..
 */
export function cardSize(height) {
    let cardHeight = height/ 1.8;
    let cardWidth = cardHeight * 2/3;

    return {width: cardWidth, height: cardHeight};

}