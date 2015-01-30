FROM dockerfile/java:oracle-java8

ADD uzura-api-0.0.1-SNAPSHOT.jar /opt/uzura-api/bin/
EXPOSE 8080
WORKDIR /opt/uzura-api/
CMD ["java", "-jar", "bin/uzura-api-0.0.1-SNAPSHOT.jar"]
