export function calculateScore(scoreObj, timeObj) {
    let timePerQuestion = timeObj.perQuestion || 6;

    let points = scoreObj.value * (60 - timeObj.value / scoreObj.value) || 0;
    console.log(scoreObj, timeObj, points);
    const scoreValue = scoreObj.value > 0 ? scoreObj.value : 0;

    let average = 0;
    let colors = {
        score: null,
        stopwatch: null,
        points: null,
    };

    if (scoreValue >= scoreObj.max - Math.ceil(0.1 * scoreObj.max)) {
        colors.score = 'green';
        points *= 2;
        average++;
    } else if (scoreValue < scoreObj.max / 2) {
        colors.score = 'red';
        points /= 2;
    } else {
        average += 0.5;
    }

    if (scoreValue * timePerQuestion >= timeObj.value) {
        colors.stopwatch = 'green';
        points *= 1.5;
        average++;
    } else if (scoreValue * 3 * timePerQuestion <= timeObj.value) {
        colors.stopwatch = 'red';
        points /= 1.8;
    } else {
        average += 0.5;
    }

    if (average >= 2) {
        colors.points = 'green';
    } else if (average < 1) {
        colors.points = 'red';
    }


    return {
        value: { points, average },
        colors
    }
}

export function getPoints(scoreObj, timeObj) {
    return calculateScore(scoreObj, timeObj).value.points;
}