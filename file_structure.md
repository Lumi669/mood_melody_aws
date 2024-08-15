src/
│
├── config/ # Configuration files (e.g., database, AWS)
│ ├── database.ts # DynamoDB or Sequelize config (if mixed use)
│ ├── awsConfig.ts # AWS SDK configuration (if needed)
│ └── env.ts # Environment variables
│
├── controllers/ # Controllers for handling request logic
│ ├── authController.ts # Handles signup, login, logout
│ ├── musicController.ts # Handles music-related logic
│ └── imageController.ts # Handles image-related logic
│
├── models/ # Models (e.g., DynamoDB schemas or Sequelize models)
│ ├── user.ts # User schema/model for authentication
│ ├── music.ts # Music schema/model
│ └── image.ts # Image schema/model
│
├── routes/ # Route definitions
│ ├── authRoutes.ts # Routes for signup, login, logout
│ ├── musicRoutes.ts # Routes for music APIs
│ └── imageRoutes.ts # Routes for image APIs
│
├── middlewares/ # Middleware for request processing
│ ├── authMiddleware.ts # Middleware for authentication (e.g., JWT)
│ └── errorHandler.ts # Global error handler
│
├── services/ # Business logic, integration with external services
│ ├── authService.ts # Logic for handling auth operations
│ ├── musicService.ts # Logic for music-related operations
│ └── imageService.ts # Logic for image-related operations
│
├── utils/ # Utility functions
│ ├── logger.ts # Logging utility
│ └── dynamoClient.ts # AWS DynamoDB client initialization
│
├── validators/ # Input validation schemas
│ ├── authValidator.ts # Validation for signup, login data
│ ├── musicValidator.ts # Validation for music API data
│ └── imageValidator.ts # Validation for image API data
│
├── index.ts # Entry point for serverless/lambda
└── server.ts # Main server configuration and app initialization
