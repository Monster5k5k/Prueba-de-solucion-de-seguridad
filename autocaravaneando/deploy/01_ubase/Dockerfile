FROM ubuntu:24.04
ARG USUARIO
ARG PASSWORD

# Instalar básicos y SSH
RUN apt-get update && apt-get install -y curl git sudo nano net-tools iproute2 openssh-server && rm -rf /var/lib/apt/lists/*

# Configurar Usuario y SSH
RUN userdel -r ubuntu || true
RUN useradd -rm -d /home/${USUARIO} -s /bin/bash -g root -G sudo -u 1000 ${USUARIO} \
    && echo "${USUARIO}:${PASSWORD}" | chpasswd \
    && mkdir -p /home/${USUARIO}/.ssh \
    && mkdir -p /var/run/sshd