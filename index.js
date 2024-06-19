function knightsMoves(start, end, moves)
{
    let startString = `${start[0]}${start[1]}`;
    let endString = `${end[0]}${end[1]}`;

    let unvisited = [];
    let dist = {};
    let prev = {};

    let squares = Object.keys(moves);
    for (let i = 0; i < squares.length; i++)
    {
        let vertex = squares[i];
        dist[vertex] = Infinity;
        prev[vertex] = undefined;
        unvisited.push(vertex);
    }

    dist[`${start[0]}${start[1]}`] = 0;

    while (unvisited.length > 0)
    {
        // Find min
        let u;
        let smallestDist = Infinity;
        for (let i = 0; i < unvisited.length; i++)
        {
            if (dist[unvisited[i]] <= smallestDist)
            {
                u = unvisited[i];
                smallestDist = dist[unvisited[i]];
            }
        }

        if (u === endString)
        {
            let path = [];
            if (prev[u] || u === startString)
            {
                while (u)
                {
                    path.unshift([u[0], u[1]]);
                    u = prev[u];
                }
            }
            return path;
        }

        // Visit minimum dist item
        unvisited.splice(unvisited.indexOf(u), 1);

        let neighbours = moves[u];
        for (let k = 0; k < neighbours.length; k++)
        {
            let n = neighbours[k];
            let alt = dist[u] + 1;
            if (alt < dist[n])
            {
                dist[n] = alt;
                prev[n] = u;
            }
        }
    }
    return null;
}

const MOVE_DELTAS = [
    [2, -1],
    [2, 1],
    [-2, -1],
    [-2, 1],
    [-1, 2],
    [-1, -2],
    [1, 2],
    [1, -2]
];

function generateKnightMovesForCoords(x, y)
{
    let moves = [];

    for (let i = 0; i < MOVE_DELTAS.length; i++)
    {
        let delta = MOVE_DELTAS[i];
        let newX = x + delta[0];
        let newY = y + delta[1];

        if (newX < 0 || newX > 7 || newY < 0 || newY > 7) continue;

        moves.push(`${newX}${newY}`);
    }

    return moves;
}

function generateAllMoves()
{
    let moves = {};

    for (let i = 0; i < 8; i++)
    {
        for (let j = 0; j < 8; j++)
        {
            moves[`${i}${j}`] = generateKnightMovesForCoords(i, j);
        }
    }

    return moves;
}

let allMoves = generateAllMoves();
let result = knightsMoves([3, 3], [4, 3], allMoves);
console.log(`You made it in ${result.length} moves! Here's your path:`);
for (let i = 0; i < result.length; i++)
{
    console.log(`[${result[i][0]}, ${result[i][1]}]`);
}