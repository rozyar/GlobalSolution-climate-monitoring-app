# Climate Monitor App

This project is a comprehensive Climate Monitor App designed to provide real-time weather information along with monitoring of oceanic plastic pollution and wildfire incidents globally. The app integrates climate data, maps, and environmental monitoring features to offer users a holistic view of the current environmental conditions.

## Features

- **Real-Time Weather Information**: Provides up-to-date weather forecasts including temperature, humidity, wind speed, and more.
- **Ocean Plastic Pollution Monitoring**: Displays locations of significant ocean plastic pollution, helping to raise awareness about marine pollution.
- **Wildfire Tracking**: Shows real-time locations of active wildfires around the world, aiding in environmental monitoring and awareness.
- **Interactive Maps**: Utilizes Google Maps to display weather conditions, plastic pollution sites, and wildfire locations.
- **API Integration**: Utilizes external APIs for weather data and integrates custom APIs for pollution and wildfire data.

## Technology Stack

- **Frontend**: Developed using React Native for cross-platform mobile application development.
- **Backend**: Built with NestJS, utilizing Prisma for database management and MySQL for data storage.

## Team Members

**Names and RMs:**

- **Razyel Ferrari**: rm551875 - GitHub: [irazyel](https://github.com/irazyel)
- **Rayzor Anael**: rm551832 - GitHub: [rozyar](https://github.com/rozyar)
- **Derick Araújo**: rm551007 - GitHub: [dericki](https://github.com/dericki)
- **Kalel Schlichting**: rm550620 - GitHub: [K413l](https://github.com/K413l)
- **Phablo Santos**: rm550687 - GitHub: [PhabloFiap](https://github.com/PhabloFiap)

### Cloning the Repository

1. Clone the repository:
   ```bash
   git clone https://github.com/rozyar/GlobalSolution-climate-monitoring-app.git
   ```

### Backend Setup

To start the backend, ensure you have Docker and Node.js installed on your machine.

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install the dependencies:

   ```bash
   yarn install
   ```

3. Start the Docker containers for the MySQL database:

   ```bash
   docker-compose up
   ```

4. Generate the Prisma client:

   ```bash
   yarn run prisma generate
   ```

5. Push the Prisma schema to the database:

   ```bash
   yarn run prisma db push
   ```

6. Start the backend server:
   ```bash
   yarn run start:dev
   ```

### Frontend Setup

Ensure your machine is configured to use React Native with an Android emulator. You can follow the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) guide. Then follow these steps:

1. Navigate to the frontend directory:

   ```bash
   cd FrontEnd
   ```

2. Install the dependencies:

   ```bash
   yarn install
   ```

3. Start the Expo development server:

   ```bash
   yarn expo start
   ```

4. Select to open the Android emulator. The API URL used in `axios` in the `helpers/api.ts` file should be set to `http://10.0.2.2:3890` to allow the emulator to communicate with the backend.

## API Documentation

For detailed information, you can find it in the API.md file.
