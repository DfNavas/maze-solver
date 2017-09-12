const _ = require('lodash');

function findPath(mazeString) {
    var maze = [];
    var solution = [];
    var row = mazeString.split("\r\n");
    for (i = 0; i < row.length; i++) {
        maze[i] = row[i].split(" ");
        solution[i] = row[i].split(" ");
    }
    var nRow = solution.length;
    var nCol = solution[0].length;
    var start = [-1, -1];
    for (i = 0; i < nRow; i++) {
        for (j = 0; j < nCol; j++) {
            if (solution[i][j] == "S") {
                start = [i, j];
            } else if (solution[i][j] == "1") {
                solution[i][j] = "@";
            } else if (solution[i][j] == "0") {
                solution[i][j] = "_";
            }
        }
    }
    solution = solve(solution, start[0], start[1]);
    for (i = 0; i < nRow; i++) {
        for (j = 0; j < nCol; j++) {
            if (solution[i][j] == "@") {
                solution [i][j] = "1";
            } else if (solution[i][j] == "#") {
                solution [i][j] = "0";
            } else if (solution[i][j] == "_") {
                solution [i][j] = "0";
            }
        }
    }
    for (i = 0; i < nRow; i++) {
        solution[i] = solution[i].join(" ");
    }
    return solution;
}

function solve(solution, x, y) {
    var newStep = lookFor("_", solution, x, y);
    var oldStep = lookFor("X", solution, x, y);
    var winStep = lookFor("E", solution, x, y);
    if (winStep[0] != -2) {
        return solution;
    } else if (newStep[0] != -2) {
        solution[newStep[0]][newStep[1]] = "X";
        solve(solution, newStep[0], newStep[1]);
    } else if (oldStep[0] != -2) {
        solution[x][y] = "#";
        solve(solution, oldStep[0], oldStep[1]);
    }
    return solution;
}

function lookFor(target, solution, x, y) {
    var location = [-2];

    function check(x, y) {
        try {
            return solution[x][y] == target
        } catch (e) {
            return false
        }
    }

    if (check(x - 1, y)) {
        location = [x - 1, y];
    } else if (check(x, y - 1)) {
        location = [x, y - 1];
    } else if (check(x + 1, y)) {
        location = [x + 1, y];
    } else if (check(x, y + 1)) {
        location = [x, y + 1];
    }
    return location;
}

module.exports = findPath;