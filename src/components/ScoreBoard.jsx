function ScoreBoard({ score, totalPoints }) {
    const progress = Math.min((score / totalPoints) * 100, 100);

    return (
        <div className="score-board">
            <div className="score-display">
                <span>SCORE:</span>
                <span className="score-value">{score.toString().padStart(6, '0')}</span>
            </div>
            <div className="progress-bar-container">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    )
}

export default ScoreBoard
