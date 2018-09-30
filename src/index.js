module.exports = function getZerosCount(number, base){
    /*
    1) найти основание K в виде произведения простых чисел, запомнить эти простые числа
    и степени при них, для каждого числа от 2 до N проверить на делимость на эти простые числа;
    2) выбрать минимум из отношений суммы степеней при простых числах
    к значению их степеней в основании.
    */
    const primeNumbers = [];            //массив простых чисел для базы
    for (let n = 2; n <= base; n++) {
        let nUnique = true;
        for (let a = 2; a < n; a++) {
            if (n % a === 0) {
                nUnique = false;
                break;
            }
        }
        if (nUnique === true) {
            primeNumbers.push(n);
        }
    }

    //console.log(primeNumbers);

    const primePow = [];              // массив степеней простых чисел
    let temp = base;
    for (let i = 0; i < primeNumbers.length; i++) {
        const tempNum = primeNumbers[i];
        while (temp % tempNum === 0) {
            primePow[tempNum] = (primePow[tempNum] || 0) + 1;
            temp = temp / tempNum;
        }
    }

    //console.log(primePow);

    const resultArray = [];    //массив отношений суммы степеней при простых числах к значению их степеней в основании
    for (let i = 0; i< primePow.length; i++) {
        const count = primePow[i];
        let zerosCount = 0;
        let numPow = 1;
        if (count === undefined ){
            continue;
        }
        do {
            countTemp = Math.floor(number / Math.pow(i, numPow));
            zerosCount += countTemp;
            numPow++;
        } while (countTemp >= 1);
        resultArray.push(Math.floor(zerosCount / count));
    }

    //console.log(resultArray);
    resultArray.sort(function (a,b) {
        return a-b;
    });

    return resultArray[0]; //выбор минимального значения
};