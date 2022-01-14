import * as React from "react";
import * as ReactDOM from "react-dom";

class AppDemo extends React.Component {
    render() {
        return (<p>This works!!</p>);
    }
}


function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}


interface BoardProperties{
    squares?:any[];
    onClick?:any;
}

class Board extends React.Component<BoardProperties> {
    private get componentProperties(): any {
        return (this.props as any);
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }

    renderSquare(i) {
        return <Square value={this.componentProperties.squares[i]} onClick={() => this.componentProperties.onClick(i)} />;
    }
}

class Game extends React.Component {
    private get componentState(): any {
        return (this.state as any);
    }

    constructor(props) {
        super(props);
        this.state = {
            history: [{ squares: Array(9).fill(null) }],
            xIsNext: true
        };
    }

    render() {
        const history = this.componentState.history;
        const currentState = history.slice()[history.length - 1];
        let status = this.componentState.xIsNext ? 'Next player: X' : 'Next player: O';
        let winner = CalculateWinner(currentState.squares);
        if (winner) {
            status = 'Winner ' + winner;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={currentState.squares} onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }

    handleClick(i) {
        const history = this.componentState.history;
        const currentState = history.slice()[history.length - 1];
        const currentSquaresCopy = currentState.squares.slice();

        if (CalculateWinner(currentSquaresCopy) || currentSquaresCopy[i]) {
            return;
        }

        currentSquaresCopy[i] = this.componentState.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{ squares: currentSquaresCopy }]),
            xIsNext: !this.componentState.xIsNext
        });
    }

}

function CalculateWinner(squares) {
    const lineChecks = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lineChecks.length; i++) {
        const line = lineChecks[i];
        const [a, b, c] = line;

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('output')
);