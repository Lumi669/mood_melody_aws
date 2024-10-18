# mood_melody

# local frontend docker image build

# works ! Note before build frontend image start backend server by `pnpm run start`

docker buildx build --build-arg NEXT_PUBLIC_API_URL_0=http://host.docker.internal:4000/ \
 --build-arg NEXT_PUBLIC_API_URL_1=http://host.docker.internal:4000/api/images \
 --build-arg NEXT_PUBLIC_API_URL_2=http://host.docker.internal:4000/api/musics \
 --build-arg NEXT_PUBLIC_API_URL_3=http://host.docker.internal:4000/test \
 --build-arg NEXT_PUBLIC_API_URL_4=http://host.docker.internal:4000/api/sentimentanalysis \
 -t image-name .

## but use below because the above built docker image but not load into local Docker environment or pushed to a registry. This happened because I didn't specify the --load or --push options in the docker buildx build command. Below cmd load the image locally and image can be viewed by `docker images`

docker buildx build --build-arg NEXT_PUBLIC_API_URL_0=http://host.docker.internal:4000/ \
 --build-arg NEXT_PUBLIC_API_URL_1=http://host.docker.internal:4000/api/images \
 --build-arg NEXT_PUBLIC_API_URL_2=http://host.docker.internal:4000/api/musics \
 --build-arg NEXT_PUBLIC_API_URL_3=http://host.docker.internal:4000/test \
 --build-arg NEXT_PUBLIC_API_URL_4=http://host.docker.internal:4000/api/sentimentanalysis \
 -t image-name . --load

# local frontend docker container run , working cmd, access localhost:3000

docker run -e NEXT_PUBLIC_API_URL_0=http://host.docker.internal:4000/ \
 -e NEXT_PUBLIC_API_URL_1=http://host.docker.internal:4000/api/images \
 -e NEXT_PUBLIC_API_URL_2=http://host.docker.internal:4000/api/musics \
 -e NEXT_PUBLIC_API_URL_3=http://host.docker.internal:4000/test \
 -e NEXT_PUBLIC_API_URL_4=http://localhost:4000/api/sentimentanalysis \
 -p 3000:7000 --name my-app-container image-name

# Note below not work

docker buildx build --build-arg NEXT_PUBLIC_API_URL_0=http://localhost:4000/ --build-arg NEXT_PUBLIC_API_URL_1=http://localhost:4000/api/images --build-arg
NEXT_PUBLIC_API_URL_2=http://localhost:4000/api/musics --build-arg
NEXT_PUBLIC_API_URL_3=http://localhost:4000/test -t aaa .

# trigger frontend app directly via cmd

aws lambda invoke --function-name MoodMelodyFrontendFunction:green --payload '{"path":"/"}' response.json --cli-binary-format raw-in-base64-out
