# Build stage
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app

# Copy only pom.xml first to cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build application
RUN mvn clean package -DskipTests -Dmaven.test.skip=true -Dmaven.main.skip=true

# Run stage
FROM openjdk:17-slim
WORKDIR /app

# Copy only the built jar file
COPY --from=build /app/target/*.jar app.jar

# Set environment variables
ENV SPRING_PROFILES_ACTIVE=prod
ENV OPENAI_API_KEY=${OPENAI_API_KEY}
ENV QDRANT_HOST=qdrant
ENV QDRANT_PORT=6334

# Expose port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"] 