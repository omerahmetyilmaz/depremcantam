function GameContainer({ children }) {
    return (
        <div className="game-container">
            <div className="screen-bezel">
                <div className="crt-screen">
                    <div className="scanlines"></div>
                    <div className="screen-content">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameContainer
