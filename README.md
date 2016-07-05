# gridexplorer

You should submit your own code for this project. However, you should partner up with someone who can be your go-to person for questions. You can share small bits of code with this person but they're primarily there to help you debug your application.

Try to get as close to complete as you can on all requirements. Remember we've got Monday off so this assignment is officially due on Tuesday morning.

Gridland Complete

Gridland is a grid-based game where one player tries to stay alive for as long as possible by collecting energy pods scattered throughout the grid. You can see the game in action here. It's composed of three views (new game, play game, and game over views), and high scores are sync'd to a remote server.

Normal mode

Normal mode includes all features from previous assignments this weekend, as well as some additional features. Full descriptions are present in previous assignments, but at a high level the goals include:

Create a new game view that allows players to enter their name and select a player type. You should allow any player type provided by the player server. Selecting a particular player type should affect the properties listed in the response (the energyPerMove and the startingEnergy). Users should be able to click a 'go' button at which point they'll transition over to the play game view.

The play game view should show the player's name, current position, how much energy is remaining, and current score. When their energy dips to zero or below, they should be automatically moved to the game over view. You can keep score however you see fit (one point per step would be a reasonable approach).

The game over view should POST the player's name, score, and playerType to the high score server. It should then display a message saying that the game is over, display the user's score, and retrieve and display a list of current high scores that's shared across all games.

New features include:

Randomly place an energy pod in the grid. When the player shares a cell with the energy pod, they should receive energy and a new pod should be placed at a new random position.
Render the grid using a series of <div>'s or similar elements. Cells that contain the player and the energy pod should look different than empty cells.
Add styling to all views (after other parts are complete!).
Hard mode

All of normal mode as well as powerups; energy pods have a certain chance to give players temporary special powers that affect gameplay. Some examples:

Reduce the amount of energy consumed by moving around.
Allow teleporting to random locations in addition to standard movement.
Multipliers on final score.
Feel free to make up your own ideas as well.
