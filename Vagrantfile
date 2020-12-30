Vagrant.configure("2") do |config|
  config.vm.define "server" do |server|
    server.vm.box = "ubuntu/bionic64"
    server.vm.network "private_network", ip: "192.168.33.10", virtualbox__intnet: "virtual_vagrant_internal_network"
    server.vm.synced_folder "./release", "/app/release"
    server.vm.provider "virtualbox" do |vb|
      vb.gui = true
      vb.memory = "1024"
    end
    server.vm.provision "docker"
    server.vm.provision "shell", inline: <<-SHELL
      apt-get update
      apt-get upgrade
      apt-get -y install docker-compose
    SHELL
  end
  config.vm.define "client" do |client|
    client.vm.box = "ubuntu/bionic64"
    client.vm.network "private_network", ip: "192.168.33.11", virtualbox__intnet: "virtual_vagrant_internal_network"
    client.vm.provider "virtualbox" do |vb|
      vb.gui = true
      vb.memory = "2048"
      vb.customize [
        "modifyvm", :id,
        "--vram", "256",
        "--clipboard", "bidirectional",
        "--draganddrop", "bidirectional",
        "--cpus", "2",
        "--ioapic", "on" # I/O APICを有効化
      ]
    end
    client.vm.provision "shell", inline: <<-'SHELL'
      apt-get update
      apt-get upgrade
      apt-get install -y \
        ubuntu-desktop \
        apt-transport-https \
        ca-certificates \
        software-properties-common
      SERVER_IP=192.168.33.10
      echo "$SERVER_IP utcode.net" >> /etc/hosts
      echo "$SERVER_IP members.utcode.net" >> /etc/hosts
      echo "$SERVER_IP gitea.members.utcode.net" >> /etc/hosts
      echo "$SERVER_IP blog.members.utcode.net" >> /etc/hosts
      reboot
    SHELL
  end
end
