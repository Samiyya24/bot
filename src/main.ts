// Importing necessary modules
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

// Function to start the Nest.js application
async function start() {
  try {
    const PORT = process.env.PORT || 3030; // Default port to 3000 if PORT environment variable is not set

    // Create an instance of Nest application
    const app = await NestFactory.create(AppModule);

    // Define Swagger document configuration
    const config = new DocumentBuilder()
      .setTitle('Bot Project')
      .setDescription('Stadium REST API')
      .setVersion('1.0')
      .addTag('NestJS, Nodejs, Postgres, Bot, SMS, Sequezlize, Swagger, Mailer')
      .build();

    // Set global prefix for API routes
    app.setGlobalPrefix('api');

    // Generate Swagger documentation
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    // Use cookie parser middleware
    app.use(cookieParser());

    // Apply global validation pipe for input validation
    app.useGlobalPipes(new ValidationPipe());

    // Start listening for incoming connections on the specified port
    await app.listen(PORT);

    // Log server start message
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    // Log any errors that occur during server startup
    console.error('Error starting server:', error);
  }
}

// Call the start function to start the application
start();
