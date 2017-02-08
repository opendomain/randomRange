// BYTE
var UINT_BYTE = Math.pow(2, 8);

// Standard get Random data
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomInt2(min, max) {
    var result = 0;

    var range = max - min + 1;
    var numBits = bitSize(range - 1);
    var mask = calcBitMask(numBits);

    var numBytes = Math.ceil(numBits / 8);

    var byteArray = new Uint8Array(numBytes);   // Create byte array and fill with random data
    var mult;

    do {
        result = 0;
        mult = 1;

        window.crypto.getRandomValues(byteArray);
        for (var b = 0; b < numBytes; b++) {
            if (b == (numBytes - 1)) {
                byteArray[b] = byteArray[b] & mask;  // Filter out any bits we are not interested in
            }
            result = result + (byteArray[b] * mult);
            mult *= UINT_BYTE;
        }
    } while (result >= range);  // If the random result is larger than the range, try again


    return result + min;
}

// Calculate the bitmask - bits we are interested in - up to a full byte
function calcBitMask(numBits) {
    var extraBits = numBits % 8;
    if (extraBits == 0) extraBits = 8;  // Get all the bits
    var mask = (Math.pow(2, extraBits) - 1);

    return mask;
}

// Number of total bits in a number
function bitSize(num) {
    return num.toString(2).length;
}
