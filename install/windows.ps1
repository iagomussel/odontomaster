# install docker and docker-compose

#install docker
$DockerInstaller = Join-Path $Env:Temp InstallDocker.msi
## Personally, I like BITS:
# Start-BitsTransfer https://download.docker.com/win/stable/InstallDocker.msi -Destination $DockerInstaller
Invoke-WebRequest https://download.docker.com/win/stable/InstallDocker.msi -OutFile $DockerInstaller
## Now install it
msiexec -i $DockerInstaller -quiet

#install docker-compose
$DockerComposeInstaller = Join-Path $Env:Temp InstallDockerCompose.msi
## Personally, I like BITS:
# Start-BitsTransfer
#
#

