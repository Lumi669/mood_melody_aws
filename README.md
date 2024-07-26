# mood_melody

# local frontend docker image build

# works !

docker buildx build --build-arg NEXT_PUBLIC_API_URL_0=http://host.docker.internal:4000/ --build-arg NEXT_PUBLIC_API_URL_1=http://host.docker.internal:4000/api/images --build-arg NEXT_PUBLIC_API_URL_2=http://host.docker.internal:4000/api/musics --build-arg NEXT_PUBLIC_API_URL_3=http://host.docker.internal:4000/test -t image-name .

# local frontend docker container run , working cmd

docker run -e NEXT_PUBLIC_API_URL_0=http://host.docker.internal:4000/ \
 -e NEXT_PUBLIC_API_URL_1=http://host.docker.internal:4000/api/images \
 -e NEXT_PUBLIC_API_URL_2=http://host.docker.internal:4000/api/musics \
 -e NEXT_PUBLIC_API_URL_3=http://host.docker.internal:4000/test \
 -p 3000:3000 image-name

# Note below not work

docker buildx build --build-arg NEXT_PUBLIC_API_URL_0=http://localhost:4000/ --build-arg NEXT_PUBLIC_API_URL_1=http://localhost:4000/api/images --build-arg
NEXT_PUBLIC_API_URL_2=http://localhost:4000/api/musics --build-arg
NEXT_PUBLIC_API_URL_3=http://localhost:4000/test -t aaa .
