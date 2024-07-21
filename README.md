# Rubik's Cube Simulation

This project is a simple Rubik's Cube simulation built with React and vanilla JavaScript. It allows users to interact with a 3D representation of a Rubik's Cube, rotating its faces using on-screen controls.

## Features

- 3D visualization of a Rubik's Cube
- Interactive controls for rotating cube faces
- Responsive design that works on various screen sizes
- No build tools required - runs directly in the browser

## Files

- `index.html`: The main HTML file that loads the React library and the application script.
- `app.js`: The JavaScript file containing the React component for the Rubik's Cube simulation.
- `vercel.json`: Configuration file for deploying the project on Vercel.

## How to Run Locally

1. Clone this repository to your local machine.
2. Open the `index.html` file in a modern web browser.

That's it! The simulation should run directly in your browser without any need for compilation or build steps.

## Deployment

This project is set up for easy deployment on Vercel. To deploy:

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and sign in or create an account.
3. Click "New Project" and select your GitHub repository.
4. Vercel will automatically detect the configuration from the `vercel.json` file.
5. Click "Deploy" and wait for the deployment to complete.

## How to Use

Once the simulation is running, you can interact with the Rubik's Cube using the on-screen controls:

- `U`: Rotate the upper face
- `D`: Rotate the down face
- `F`: Rotate the front face
- `B`: Rotate the back face
- `L`: Rotate the left face
- `R`: Rotate the right face

Each face can be rotated clockwise (by clicking the face letter) or counterclockwise (by clicking the face letter followed by an apostrophe, e.g., `U'`).

## Customization

You can easily customize the colors of the cube by modifying the `COLORS` array in the `app.js` file.

## Limitations

- This simulation does not include a solver algorithm.
- The cube's overall rotation is fixed and cannot be changed by the user.

## Future Improvements

- Add touch and drag controls for mobile devices
- Implement a solving algorithm
- Allow users to customize cube colors
- Add keyboard controls

## Created By

This Rubik's Cube simulation was created with the assistance of Claude 3.5 Sonnet (July 2024 version), an AI language model developed by Anthropic.

## License

This project is open source and available under the MIT License.
