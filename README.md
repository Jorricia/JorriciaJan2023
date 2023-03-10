Hey there, make sure to add the node modules folder and the pokdex package to make the program run.

Also, I felt it would be easier for you to see all of my complete 'incomplete' work so here are the notes required for the rest of the assignment. Please 
don't hesitate to contact me if this made matters worse and you'd prefer the link or a screenshot...

LO 15 — distinguish between a container and an image. 
LO 16 — run React applications within a docker container. 
LO 17 — develop and execute build pipelines within Jenkins. 
LO 18 — summarize the need for tools like Jenkins within application development. 


	Incomplete Notes
	• Containers Vs. Images
		○ Images are a  read-only templates that contain instructions for creating containers; Kind of like a blueprint of what will be in the container when it runs
		○ It contains the code, run-times, dependencies, and other file system objects
		○ Images can be manually built through a text document
		○ Images are immutable, so you cannot change them once they are created
		○ Images themselves do not run, you have to create and run containers from a Docker image.
		○ Containers are an isolated place where applications are ran without affecting the rest of the system, and without it impacting the application
		○ In order to not restart the container when you stop it you have make those configurations
		○ Containers can be created by images
		○ Can be used for packaging an app, then ship it out as one unit.
		○ Container runs the software 
	• Conclusion: An image is a snapshot of an environment and the containers run the software They both allow the users to specify application dependencies and 
  configurations and to describe everything necessary for a machine to run that application. However, containers and images have different lifecycles.
	
	• Running react in Docker containers
		○ Create a react app using: 
			npx create-react-app project_name
		○ Move it a folder using:
			cd project_name
		○ Create a DockerFile:
			$ touch Dockerfile.dev
		○ These need to inserted in the new file:
			# Fetching the latest node image on alpine linux
FROM node:alpine AS development
			
			# Declaring env
ENV NODE_ENV development
			# Setting up the work directory
WORKDIR /react-app
			# Installing dependencies
COPY ./package.json /react-app
RUN npm install
			# Copying all the files in our project
COPY . .
			# Starting our application
CMD npm start
	• Create a .dockerignore file to exclude unnecessary files thus speeding up the build process.
			
			node_modules
npm-debug.log
build
.git
*.md
.gitignore
			
	• Create a docker image by using the docker build command
			$ docker build -f Dockerfile.dev -t <name:tag> .
			Here, .
			
			 
	• Create a docker container by running 
			$ docker run -d -it –rm -p [host_port]:[container_port] –name [container_name] [image_id/image_tag]
	• From geeks4geeks
			 
			Dockerfile for production: Now, by looking into docker images you will find that our simple react application is taking up more than 500 MB of space. 
      This is not suitable for deployment. So, we will now serve the react build files via a web server for better performance and load balancing.
			We will use Nginx to serve our static files. So, firstly create an Nginx conf file in the root of our react application.
			$ touch nginx.conf
			Paste the following content into the conf file.
			server {
 listen 80;
 
 location / {
   root /usr/share/nginx/html/;
   include /etc/nginx/mime.types;
   try_files $uri $uri/ /index.html;
 }
}
			Here, we are telling our server to serve the index file from the root directory when a request is received on port 80.
			Create a new Dockerfile for production mode.
			$ touch Dockerfile
			Paste the following commands:
			# Fetching the latest node image on apline linux
FROM node:alpine AS builder
			# Declaring env
ENV NODE_ENV production
			# Setting up the work directory
WORKDIR /app
			# Installing dependencies
COPY ./package.json ./
RUN npm install
			# Copying all the files in our project
COPY . .
			# Building our application
RUN npm run build
			# Fetching the latest nginx image
FROM nginx
			# Copying built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
			# Copying our nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
			Now, repeat the same steps to build an image from our new Dockerfile and create a container out of it.
			$ docker build -t [name:tag] .
			$ docker run -d -it –rm -p [host_port]:[container_port] –name [container_name] [image_id/image_tag]
			
	• Develop and execute build piplines
		○ Install the Docker Pipeline plugin through the Manage Jenkins > Manage Plugins page
		○ After installing the plugin, restart Jenkins so that the plugin is ready to use
		○ Java
		/* Requires the Docker Pipeline plugin */pipeline {
    agent { docker { image 'maven:3.8.7-eclipse-temurin-11'} }
    stages {
        stage('build') {
            steps {
                sh 'mvn --version'}
        }
    }
}
		
		
	• Jenkins is a Java-based automation platform that helps developers and DevOps engineers integrate changes to their projects more easily.
  It's also commonly used for continuous integration, which makes it easier for consumers to get new builds of software.
