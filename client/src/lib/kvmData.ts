// KVM 安装指南数据结构

export interface CodeBlock {
  title: string;
  description: string;
  code: string;
  language: string;
  note?: string;
}

export interface Step {
  stepNumber: number;
  title: string;
  description: string;
  codeBlocks: CodeBlock[];
}

export interface OSVariant {
  id: string;
  name: string;
  icon: string;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  icon: string;
  subsections: Subsection[];
}

export interface Subsection {
  id: string;
  title: string;
  description: string;
  osVariants: Record<string, OSContent>;
}

export interface OSContent {
  online?: Step[];
  offline?: Step[];
  notes?: string[];
}

// 操作系统列表
export const osVariants: OSVariant[] = [
  { id: 'ubuntu', name: 'Ubuntu / Debian', icon: '🐧' },
  { id: 'centos', name: 'CentOS / RHEL', icon: '🎩' },
  { id: 'arch', name: 'Arch Linux', icon: '⚙️' },
];

// 数据结构
export const kvmGuideData: Section[] = [
  {
    id: 'environment-check',
    title: '环境检查',
    description: '在安装 KVM 之前，确保您的硬件和系统满足要求。',
    icon: '✓',
    subsections: [
      {
        id: 'hardware-virtualization',
        title: '硬件虚拟化支持检查',
        description: 'KVM 需要 CPU 支持硬件虚拟化扩展（Intel VT-x 或 AMD-V）。',
        osVariants: {
          ubuntu: {
            online: [
              {
                stepNumber: 1,
                title: '检查 CPU 虚拟化支持',
                description: '运行以下命令检查您的 CPU 是否支持硬件虚拟化。',
                codeBlocks: [
                  {
                    title: '通用检查命令',
                    description: '检查 CPU 是否支持 vmx（Intel）或 svm（AMD）。',
                    code: `if egrep -q 'vmx|svm' /proc/cpuinfo; then
    echo "✅ 您的 CPU 支持硬件虚拟化。"
else
    echo "❌ 您的 CPU 不支持硬件虚拟化，请检查 BIOS 设置。"
fi`,
                    language: 'bash',
                    note: '如果结果为否，请重启计算机，进入 BIOS，启用 VT-x（Intel）或 AMD-V（AMD）。',
                  },
                  {
                    title: 'Intel CPU 专用检查',
                    description: '仅检查 Intel VT-x 扩展。',
                    code: `egrep -c '(vmx)' /proc/cpuinfo`,
                    language: 'bash',
                    note: '结果大于 0 表示支持。',
                  },
                  {
                    title: 'AMD CPU 专用检查',
                    description: '仅检查 AMD-V 扩展。',
                    code: `egrep -c '(svm)' /proc/cpuinfo`,
                    language: 'bash',
                    note: '结果大于 0 表示支持。',
                  },
                ],
              },
              {
                stepNumber: 2,
                title: '检查 KVM 模块加载',
                description: '确保 KVM 内核模块已正确加载。',
                codeBlocks: [
                  {
                    title: '检查 KVM 模块',
                    description: '查看 KVM 相关的内核模块是否已加载。',
                    code: `lsmod | grep kvm`,
                    language: 'bash',
                    note: '预期输出应包含 kvm_intel 或 kvm_amd。',
                  },
                ],
              },
            ],
          },
          centos: {
            online: [
              {
                stepNumber: 1,
                title: '检查 CPU 虚拟化支持',
                description: '运行以下命令检查您的 CPU 是否支持硬件虚拟化。',
                codeBlocks: [
                  {
                    title: '通用检查命令',
                    description: '检查 CPU 是否支持 vmx（Intel）或 svm（AMD）。',
                    code: `if egrep -q 'vmx|svm' /proc/cpuinfo; then
    echo "✅ 您的 CPU 支持硬件虚拟化。"
else
    echo "❌ 您的 CPU 不支持硬件虚拟化，请检查 BIOS 设置。"
fi`,
                    language: 'bash',
                    note: '如果结果为否，请重启计算机，进入 BIOS，启用 VT-x（Intel）或 AMD-V（AMD）。',
                  },
                ],
              },
            ],
          },
          arch: {
            online: [
              {
                stepNumber: 1,
                title: '检查 CPU 虚拟化支持',
                description: '运行以下命令检查您的 CPU 是否支持硬件虚拟化。',
                codeBlocks: [
                  {
                    title: '通用检查命令',
                    description: '检查 CPU 是否支持 vmx（Intel）或 svm（AMD）。',
                    code: `if egrep -q 'vmx|svm' /proc/cpuinfo; then
    echo "✅ 您的 CPU 支持硬件虚拟化。"
else
    echo "❌ 您的 CPU 不支持硬件虚拟化，请检查 BIOS 设置。"
fi`,
                    language: 'bash',
                    note: '如果结果为否，请重启计算机，进入 BIOS，启用 VT-x（Intel）或 AMD-V（AMD）。',
                  },
                ],
              },
            ],
          },
        },
      },
    ],
  },
  {
    id: 'system-installation',
    title: '系统安装',
    description: '在不同 Linux 发行版上安装 KVM 和相关工具。',
    icon: '📦',
    subsections: [
      {
        id: 'ubuntu-debian-install',
        title: 'Ubuntu / Debian 安装',
        description: '使用 apt 包管理器安装 KVM。',
        osVariants: {
          ubuntu: {
            online: [
              {
                stepNumber: 1,
                title: '更新软件包列表',
                description: '确保您拥有最新的软件包信息。',
                codeBlocks: [
                  {
                    title: '更新 apt 缓存',
                    description: '',
                    code: `sudo apt update`,
                    language: 'bash',
                  },
                ],
              },
              {
                stepNumber: 2,
                title: '安装 KVM 及相关工具',
                description: '安装核心 KVM 包和管理工具。',
                codeBlocks: [
                  {
                    title: '安装 KVM 软件包',
                    description: '安装 qemu-kvm、libvirt 和其他必要工具。',
                    code: `sudo apt install -y qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virt-manager`,
                    language: 'bash',
                    note: '这将安装 KVM 核心、Libvirt 管理工具、网络桥接工具和图形化管理界面。',
                  },
                ],
              },
              {
                stepNumber: 3,
                title: '配置用户权限',
                description: '将当前用户添加到 libvirt 和 kvm 用户组，以便无需 sudo 即可管理虚拟机。',
                codeBlocks: [
                  {
                    title: '添加用户到用户组',
                    description: '',
                    code: `sudo usermod -aG libvirt $USER
sudo usermod -aG kvm $USER`,
                    language: 'bash',
                    note: '您需要重新登录或运行 newgrp libvirt 以使更改生效。',
                  },
                ],
              },
              {
                stepNumber: 4,
                title: '验证安装',
                description: '检查 libvirt 服务是否正常运行。',
                codeBlocks: [
                  {
                    title: '检查 libvirtd 服务状态',
                    description: '',
                    code: `sudo systemctl status libvirtd`,
                    language: 'bash',
                    note: '确保服务处于 active (running) 状态。',
                  },
                ],
              },
            ],
            offline: [
              {
                stepNumber: 1,
                title: '在联网机器上下载软件包',
                description: '使用 --download-only 选项下载所有依赖包。',
                codeBlocks: [
                  {
                    title: '下载 KVM 软件包',
                    description: '所有 .deb 文件将保存在 /var/cache/apt/archives/ 目录下。',
                    code: `sudo apt install --download-only -y qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virt-manager`,
                    language: 'bash',
                  },
                  {
                    title: '复制软件包到离线机器',
                    description: '将下载的 .deb 文件拷贝到离线目标机器。',
                    code: `# 在联网机器上
sudo cp /var/cache/apt/archives/*.deb /tmp/kvm_packages/

# 然后将 /tmp/kvm_packages 目录拷贝到离线机器`,
                    language: 'bash',
                  },
                ],
              },
              {
                stepNumber: 2,
                title: '在离线机器上安装软件包',
                description: '使用 dpkg 安装下载的软件包。',
                codeBlocks: [
                  {
                    title: '安装 .deb 文件',
                    description: '',
                    code: `cd /tmp/kvm_packages
sudo dpkg -i *.deb`,
                    language: 'bash',
                    note: '如果出现依赖错误，可能需要多次运行或使用 sudo apt install -f 修复。',
                  },
                  {
                    title: '修复依赖错误',
                    description: '如果 dpkg 报告缺少依赖，运行此命令。',
                    code: `sudo apt install -f`,
                    language: 'bash',
                  },
                ],
              },
            ],
          },
        },
      },
      {
        id: 'centos-rhel-install',
        title: 'CentOS / RHEL / Rocky Linux 安装',
        description: '使用 dnf/yum 包管理器安装 KVM。',
        osVariants: {
          centos: {
            online: [
              {
                stepNumber: 1,
                title: '安装 @virtualization 软件包组',
                description: '安装包含 KVM 核心和管理工具的软件包组。',
                codeBlocks: [
                  {
                    title: '安装虚拟化软件包组',
                    description: '',
                    code: `sudo dnf install -y @virtualization`,
                    language: 'bash',
                    note: '这将安装 KVM、QEMU、Libvirt 和其他虚拟化工具。',
                  },
                ],
              },
              {
                stepNumber: 2,
                title: '启动 libvirtd 服务',
                description: '启动 libvirt 守护进程并设置开机自启。',
                codeBlocks: [
                  {
                    title: '启动并启用 libvirtd',
                    description: '',
                    code: `sudo systemctl enable --now libvirtd`,
                    language: 'bash',
                  },
                ],
              },
              {
                stepNumber: 3,
                title: '配置用户权限',
                description: '将当前用户添加到 libvirt 用户组。',
                codeBlocks: [
                  {
                    title: '添加用户到 libvirt 用户组',
                    description: '',
                    code: `sudo usermod -aG libvirt $USER`,
                    language: 'bash',
                    note: '您需要重新登录以使更改生效。',
                  },
                ],
              },
              {
                stepNumber: 4,
                title: '验证安装',
                description: '检查 libvirt 服务是否正常运行。',
                codeBlocks: [
                  {
                    title: '检查 libvirtd 服务状态',
                    description: '',
                    code: `sudo systemctl status libvirtd`,
                    language: 'bash',
                    note: '确保服务处于 active (running) 状态。',
                  },
                ],
              },
            ],
            offline: [
              {
                stepNumber: 1,
                title: '在联网机器上下载软件包',
                description: '使用 --downloadonly 选项下载所有依赖包。',
                codeBlocks: [
                  {
                    title: '下载虚拟化软件包',
                    description: '所有 .rpm 文件将保存在指定目录下。',
                    code: `sudo dnf install --downloadonly --downloaddir=/tmp/kvm_packages @virtualization`,
                    language: 'bash',
                  },
                  {
                    title: '复制软件包到离线机器',
                    description: '将下载的 .rpm 文件拷贝到离线目标机器。',
                    code: `# 在联网机器上
# 将 /tmp/kvm_packages 目录拷贝到离线机器`,
                    language: 'bash',
                  },
                ],
              },
              {
                stepNumber: 2,
                title: '在离线机器上安装软件包',
                description: '使用 dnf localinstall 安装下载的软件包。',
                codeBlocks: [
                  {
                    title: '安装 .rpm 文件',
                    description: '',
                    code: `cd /path/to/kvm_packages
sudo dnf localinstall *.rpm`,
                    language: 'bash',
                  },
                ],
              },
            ],
          },
        },
      },
      {
        id: 'arch-install',
        title: 'Arch Linux 安装',
        description: '使用 pacman 包管理器安装 KVM。',
        osVariants: {
          arch: {
            online: [
              {
                stepNumber: 1,
                title: '安装 KVM 核心和管理工具',
                description: '安装 QEMU、Libvirt 和相关工具。',
                codeBlocks: [
                  {
                    title: '安装 KVM 软件包',
                    description: '',
                    code: `sudo pacman -S qemu-full libvirt virt-manager dnsmasq bridge-utils`,
                    language: 'bash',
                    note: '这将安装 QEMU、Libvirt、Virt-Manager 和网络工具。',
                  },
                ],
              },
              {
                stepNumber: 2,
                title: '启动 libvirtd 服务',
                description: '启动 libvirt 守护进程并设置开机自启。',
                codeBlocks: [
                  {
                    title: '启动并启用 libvirtd',
                    description: '',
                    code: `sudo systemctl enable --now libvirtd`,
                    language: 'bash',
                  },
                ],
              },
              {
                stepNumber: 3,
                title: '配置用户权限',
                description: '将当前用户添加到 libvirt 用户组。',
                codeBlocks: [
                  {
                    title: '添加用户到 libvirt 用户组',
                    description: '',
                    code: `sudo usermod -aG libvirt $USER`,
                    language: 'bash',
                    note: '您需要重新登录以使更改生效。',
                  },
                ],
              },
            ],
          },
        },
      },
    ],
  },
  {
    id: 'network-configuration',
    title: '网络配置',
    description: '配置和调试 KVM 虚拟机网络，包括 NAT 和桥接模式。',
    icon: '🌐',
    subsections: [
      {
        id: 'nat-network',
        title: 'NAT 网络调试',
        description: '默认 NAT 网络配置和故障排查。',
        osVariants: {
          ubuntu: {
            online: [
              {
                stepNumber: 1,
                title: '检查默认网络状态',
                description: '确保 libvirt 默认网络已启动。',
                codeBlocks: [
                  {
                    title: '列出所有网络',
                    description: '检查 default 网络是否处于 active 状态。',
                    code: `virsh net-list --all`,
                    language: 'bash',
                    note: '预期输出应显示 default 网络处于 active 状态。',
                  },
                  {
                    title: '启动默认网络',
                    description: '如果网络未启动，运行此命令。',
                    code: `virsh net-start default`,
                    language: 'bash',
                  },
                  {
                    title: '设置网络自启',
                    description: '确保系统启动时自动启动网络。',
                    code: `virsh net-autostart default`,
                    language: 'bash',
                  },
                ],
              },
              {
                stepNumber: 2,
                title: '检查虚拟网桥',
                description: '验证 virbr0 虚拟网桥是否正确配置。',
                codeBlocks: [
                  {
                    title: '检查 virbr0 接口',
                    description: '查看虚拟网桥的 IP 地址和状态。',
                    code: `ip addr show virbr0`,
                    language: 'bash',
                    note: '预期输出应显示 virbr0 接口，通常 IP 为 192.168.122.1/24。',
                  },
                ],
              },
              {
                stepNumber: 3,
                title: '检查 dnsmasq 进程',
                description: '确保 dnsmasq DHCP 服务正常运行。',
                codeBlocks: [
                  {
                    title: '查看 dnsmasq 进程',
                    description: '检查 dnsmasq 是否为 virbr0 运行。',
                    code: `ps aux | grep dnsmasq`,
                    language: 'bash',
                    note: '应该看到 dnsmasq 进程绑定到 virbr0。',
                  },
                ],
              },
              {
                stepNumber: 4,
                title: '检查防火墙规则',
                description: '确保防火墙允许 NAT 转发。',
                codeBlocks: [
                  {
                    title: '查看 iptables 规则',
                    description: '检查 NAT 规则是否已配置。',
                    code: `sudo iptables -L -n | grep 192.168.122.0`,
                    language: 'bash',
                    note: '预期应看到 MASQUERADE 规则。',
                  },
                  {
                    title: '检查 IP 转发',
                    description: '确保内核 IP 转发已启用。',
                    code: `cat /proc/sys/net/ipv4/ip_forward`,
                    language: 'bash',
                    note: '结果应为 1。如果为 0，运行 sudo sysctl -w net.ipv4.ip_forward=1。',
                  },
                ],
              },
            ],
          },
          centos: {
            online: [
              {
                stepNumber: 1,
                title: '检查默认网络状态',
                description: '确保 libvirt 默认网络已启动。',
                codeBlocks: [
                  {
                    title: '列出所有网络',
                    description: '检查 default 网络是否处于 active 状态。',
                    code: `virsh net-list --all`,
                    language: 'bash',
                    note: '预期输出应显示 default 网络处于 active 状态。',
                  },
                  {
                    title: '启动默认网络',
                    description: '如果网络未启动，运行此命令。',
                    code: `virsh net-start default`,
                    language: 'bash',
                  },
                ],
              },
              {
                stepNumber: 2,
                title: '检查防火墙',
                description: 'CentOS/RHEL 使用 firewalld，需要配置防火墙规则。',
                codeBlocks: [
                  {
                    title: '启用 libvirt 防火墙区域',
                    description: '允许虚拟机网络通信。',
                    code: `sudo firewall-cmd --permanent --add-service=libvirt
sudo firewall-cmd --reload`,
                    language: 'bash',
                  },
                ],
              },
            ],
          },
          arch: {
            online: [
              {
                stepNumber: 1,
                title: '检查默认网络状态',
                description: '确保 libvirt 默认网络已启动。',
                codeBlocks: [
                  {
                    title: '列出所有网络',
                    description: '检查 default 网络是否处于 active 状态。',
                    code: `virsh net-list --all`,
                    language: 'bash',
                  },
                  {
                    title: '启动默认网络',
                    description: '如果网络未启动，运行此命令。',
                    code: `virsh net-start default`,
                    language: 'bash',
                  },
                ],
              },
            ],
          },
        },
      },
      {
        id: 'bridge-network',
        title: '桥接网络配置',
        description: '配置桥接网络，使虚拟机拥有独立的局域网 IP。',
        osVariants: {
          ubuntu: {
            online: [
              {
                stepNumber: 1,
                title: '使用 netplan 配置桥接',
                description: '在 Ubuntu 中使用 netplan 配置网络桥接。',
                codeBlocks: [
                  {
                    title: '编辑 netplan 配置文件',
                    description: '打开 /etc/netplan/ 目录下的配置文件（通常为 00-installer-config.yaml）。',
                    code: `sudo nano /etc/netplan/00-installer-config.yaml`,
                    language: 'bash',
                  },
                  {
                    title: '桥接配置示例',
                    description: '将物理网卡（如 eth0）配置为桥接。',
                    code: `network:
  version: 2
  ethernets:
    eth0:
      dhcp4: no
  bridges:
    br0:
      interfaces: [eth0]
      dhcp4: yes
      dhcp4-overrides:
        route-metric: 100`,
                    language: 'yaml',
                    note: '将 eth0 替换为您的实际网卡名称。',
                  },
                  {
                    title: '应用配置',
                    description: '应用 netplan 配置。',
                    code: `sudo netplan apply`,
                    language: 'bash',
                  },
                ],
              },
              {
                stepNumber: 2,
                title: '验证桥接配置',
                description: '检查桥接网卡是否正确配置。',
                codeBlocks: [
                  {
                    title: '检查网桥状态',
                    description: '使用 brctl 或 ip 命令检查网桥。',
                    code: `brctl show`,
                    language: 'bash',
                    note: '预期输出应显示 br0 存在，且物理网卡被列为其接口。',
                  },
                  {
                    title: '检查网桥 IP',
                    description: '确保 br0 拥有正确的 IP 地址。',
                    code: `ip addr show br0`,
                    language: 'bash',
                  },
                ],
              },
            ],
          },
          centos: {
            online: [
              {
                stepNumber: 1,
                title: '使用 nmcli 配置桥接',
                description: '在 CentOS/RHEL 中使用 NetworkManager 配置桥接。',
                codeBlocks: [
                  {
                    title: '创建网桥',
                    description: '使用 nmcli 创建名为 br0 的网桥。',
                    code: `sudo nmcli con add type bridge ifname br0`,
                    language: 'bash',
                  },
                  {
                    title: '将物理网卡加入网桥',
                    description: '将 eth0 连接到 br0。',
                    code: `sudo nmcli con add type bridge-slave ifname eth0 master br0`,
                    language: 'bash',
                    note: '将 eth0 替换为您的实际网卡名称。',
                  },
                  {
                    title: '配置网桥 IP',
                    description: '为网桥配置 IP 地址（DHCP 或静态）。',
                    code: `# DHCP 配置
sudo nmcli con modify bridge-br0 ipv4.method auto

# 或静态 IP 配置
sudo nmcli con modify bridge-br0 ipv4.method manual ipv4.addresses "192.168.1.100/24" ipv4.gateway "192.168.1.1" ipv4.dns "8.8.8.8"`,
                    language: 'bash',
                  },
                  {
                    title: '激活网桥',
                    description: '重启网络连接以应用配置。',
                    code: `sudo nmcli con down eth0
sudo nmcli con up bridge-br0`,
                    language: 'bash',
                  },
                ],
              },
            ],
          },
        },
      },
    ],
  },
  {
    id: 'common-management',
    title: '常用管理命令',
    description: '日常 KVM 虚拟机管理的常用命令。',
    icon: '⚡',
    subsections: [
      {
        id: 'vm-management',
        title: '虚拟机管理',
        description: '启动、关闭、列表等基本操作。',
        osVariants: {
          ubuntu: {
            online: [
              {
                stepNumber: 1,
                title: '虚拟机列表和状态',
                description: '查看所有虚拟机的状态。',
                codeBlocks: [
                  {
                    title: '列出所有虚拟机',
                    description: '显示所有虚拟机（包括运行中和已停止的）。',
                    code: `virsh list --all`,
                    language: 'bash',
                  },
                  {
                    title: '仅列出运行中的虚拟机',
                    description: '',
                    code: `virsh list`,
                    language: 'bash',
                  },
                ],
              },
              {
                stepNumber: 2,
                title: '启动和关闭虚拟机',
                description: '控制虚拟机的运行状态。',
                codeBlocks: [
                  {
                    title: '启动虚拟机',
                    description: '启动指定的虚拟机。',
                    code: `virsh start <vm_name>`,
                    language: 'bash',
                  },
                  {
                    title: '正常关闭虚拟机',
                    description: '优雅地关闭虚拟机。',
                    code: `virsh shutdown <vm_name>`,
                    language: 'bash',
                  },
                  {
                    title: '强制关闭虚拟机',
                    description: '立即停止虚拟机（相当于拔电源）。',
                    code: `virsh destroy <vm_name>`,
                    language: 'bash',
                    note: '仅在虚拟机无响应时使用。',
                  },
                ],
              },
              {
                stepNumber: 3,
                title: '连接虚拟机控制台',
                description: '通过控制台访问虚拟机。',
                codeBlocks: [
                  {
                    title: '连接虚拟机控制台',
                    description: '进入虚拟机的控制台（需要配置 serial 或 VNC）。',
                    code: `virsh console <vm_name>`,
                    language: 'bash',
                    note: '按 Ctrl+] 退出控制台。',
                  },
                ],
              },
            ],
          },
          centos: {
            online: [
              {
                stepNumber: 1,
                title: '虚拟机列表和状态',
                description: '查看所有虚拟机的状态。',
                codeBlocks: [
                  {
                    title: '列出所有虚拟机',
                    description: '显示所有虚拟机（包括运行中和已停止的）。',
                    code: `virsh list --all`,
                    language: 'bash',
                  },
                ],
              },
            ],
          },
          arch: {
            online: [
              {
                stepNumber: 1,
                title: '虚拟机列表和状态',
                description: '查看所有虚拟机的状态。',
                codeBlocks: [
                  {
                    title: '列出所有虚拟机',
                    description: '显示所有虚拟机（包括运行中和已停止的）。',
                    code: `virsh list --all`,
                    language: 'bash',
                  },
                ],
              },
            ],
          },
        },
      },
      {
        id: 'network-troubleshooting-toolkit',
        title: '网络调试工具箱',
        description: '专门针对网络问题的诊断和修复命令集合。',
        osVariants: {
          ubuntu: {
            online: [
              {
                stepNumber: 1,
                title: '快速诊断脚本',
                description: '一键运行完整的网络诊断，快速定位问题。',
                codeBlocks: [
                  {
                    title: '完整网络诊断脚本',
                    description: '检查 KVM 网络的所有关键组件。',
                    code: `#!/bin/bash
echo "=== KVM 网络诊断 ==="
echo ""
echo "1. 检查虚拟化支持"
egrep -q 'vmx|svm' /proc/cpuinfo && echo "✅ CPU 支持虚拟化" || echo "❌ CPU 不支持虚拟化"
echo ""
echo "2. 检查 KVM 模块"
lsmod | grep kvm && echo "✅ KVM 模块已加载" || echo "❌ KVM 模块未加载"
echo ""
echo "3. 检查 libvirt 服务"
sudo systemctl is-active libvirtd && echo "✅ libvirtd 服务运行中" || echo "❌ libvirtd 服务未运行"
echo ""
echo "4. 检查默认网络"
virsh net-list --all | grep default
echo ""
echo "5. 检查虚拟网桥"
ip addr show virbr0 2>/dev/null && echo "✅ virbr0 网桥存在" || echo "❌ virbr0 网桥不存在"
echo ""
echo "6. 检查 IP 转发"
cat /proc/sys/net/ipv4/ip_forward | grep -q 1 && echo "✅ IP 转发已启用" || echo "❌ IP 转发未启用"
echo ""
echo "7. 检查防火墙规则"
sudo iptables -L -n | grep -i masquerade && echo "✅ NAT 规则已配置" || echo "⚠️ 未找到 NAT 规则"`,
                    language: 'bash',
                    note: '将此脚本保存为 kvm-diagnose.sh，运行 bash kvm-diagnose.sh',
                  },
                ],
              },
              {
                stepNumber: 2,
                title: 'NAT 模式故障排查',
                description: '当虚拟机无法获取 IP 或无法访问外网时的排查步骤。',
                codeBlocks: [
                  {
                    title: '问题：VM 无法获取 IP',
                    description: '虚拟机启动后无法通过 DHCP 获取 IP 地址。',
                    code: `# 1. 检查 default 网络是否启动
virsh net-list --all

# 2. 如果未启动，启动网络
virsh net-start default
virsh net-autostart default

# 3. 检查 dnsmasq 进程
ps aux | grep dnsmasq | grep -v grep

# 4. 重启 libvirtd 服务
sudo systemctl restart libvirtd`,
                    language: 'bash',
                    note: '通常重启 libvirtd 或启动 default 网络可以解决此问题。',
                  },
                  {
                    title: '问题：VM 无法访问外网',
                    description: '虚拟机能获取 IP，但无法 ping 外部网络。',
                    code: `# 1. 检查宿主机 IP 转发是否启用
cat /proc/sys/net/ipv4/ip_forward

# 2. 如果为 0，启用 IP 转发
sudo sysctl -w net.ipv4.ip_forward=1

# 3. 永久启用（编辑 /etc/sysctl.conf）
sudo nano /etc/sysctl.conf
# 找到 net.ipv4.ip_forward 并设置为 1
# 或添加新行：net.ipv4.ip_forward = 1

# 4. 应用配置
sudo sysctl -p

# 5. 检查防火墙规则
sudo iptables -L -n | grep 192.168.122.0`,
                    language: 'bash',
                    note: '最常见的原因是 IP 转发未启用或防火墙规则被覆盖。',
                  },
                  {
                    title: '问题：防火墙阻止 NAT',
                    description: '确保防火墙允许 NAT 转发。',
                    code: `# 查看当前 iptables 规则
sudo iptables -L -n -v

# 查看 NAT 表规则
sudo iptables -t nat -L -n -v

# 如果规则被删除，libvirt 会自动重建
# 重启 libvirtd 服务
sudo systemctl restart libvirtd

# 再次检查规则
sudo iptables -t nat -L -n -v`,
                    language: 'bash',
                  },
                ],
              },
              {
                stepNumber: 3,
                title: '桥接模式故障排查',
                description: '当虚拟机无法通过桥接网络通信时的排查步骤。',
                codeBlocks: [
                  {
                    title: '问题：宿主机失联',
                    description: '配置桥接后，宿主机无法访问网络。',
                    code: `# 1. 检查网桥是否创建
brctl show
# 或
ip link show type bridge

# 2. 检查网桥 IP 配置
ip addr show br0

# 3. 检查物理网卡是否有 IP（不应该有）
ip addr show eth0

# 4. 如果物理网卡有 IP，需要移除
# 编辑 netplan 配置文件
sudo nano /etc/netplan/00-installer-config.yaml

# 5. 应用配置
sudo netplan apply

# 6. 检查网络连接
ip route
ping 8.8.8.8`,
                    language: 'bash',
                    note: '常见原因：IP 配置在物理网卡而非网桥上。',
                  },
                  {
                    title: '问题：VM 无法通过桥接通信',
                    description: '虚拟机连接到桥接网络但无法通信。',
                    code: `# 1. 检查虚拟网卡是否连接到网桥
brctl show

# 2. 检查 VM 虚拟网卡配置
virsh domiflist <vm_name>

# 3. 检查 VM 内部网络配置
virsh console <vm_name>
# 在 VM 内运行
ip addr
ip route
ping <gateway_ip>

# 4. 检查宿主机防火墙
sudo iptables -L -n`,
                    language: 'bash',
                  },
                ],
              },
              {
                stepNumber: 4,
                title: '高级诊断命令',
                description: '用于深入分析网络问题的高级命令。',
                codeBlocks: [
                  {
                    title: '实时监控网络流量',
                    description: '查看虚拟网桥上的网络流量。',
                    code: `# 监控 virbr0 接口的流量
sudo tcpdump -i virbr0 -n

# 监控特定 IP 的流量
sudo tcpdump -i virbr0 -n host 192.168.122.x

# 监控 DHCP 流量
sudo tcpdump -i virbr0 -n port 67 or port 68`,
                    language: 'bash',
                  },
                  {
                    title: '查看 libvirt 网络配置',
                    description: '导出和查看网络定义。',
                    code: `# 导出 default 网络配置
virsh net-dumpxml default

# 导出所有网络配置
for net in $(virsh net-list --name); do
  echo "=== Network: $net ==="
  virsh net-dumpxml $net
done`,
                    language: 'bash',
                  },
                  {
                    title: '查看虚拟机网络配置',
                    description: '导出和查看虚拟机网络设置。',
                    code: `# 导出 VM 的网络配置
virsh dumpxml <vm_name> | grep -A 10 "<interface"

# 查看 VM 的所有网络接口
virsh domiflist <vm_name>

# 查看 VM 的 MAC 地址
virsh domiflist <vm_name> --mac`,
                    language: 'bash',
                  },
                ],
              },
            ],
          },
          centos: {
            online: [
              {
                stepNumber: 1,
                title: '快速诊断脚本',
                description: '一键运行完整的网络诊断，快速定位问题。',
                codeBlocks: [
                  {
                    title: '完整网络诊断脚本',
                    description: '检查 KVM 网络的所有关键组件。',
                    code: `#!/bin/bash
echo "=== KVM 网络诊断 ==="
echo ""
echo "1. 检查虚拟化支持"
egrep -q 'vmx|svm' /proc/cpuinfo && echo "✅ CPU 支持虚拟化" || echo "❌ CPU 不支持虚拟化"
echo ""
echo "2. 检查 KVM 模块"
lsmod | grep kvm && echo "✅ KVM 模块已加载" || echo "❌ KVM 模块未加载"
echo ""
echo "3. 检查 libvirt 服务"
sudo systemctl is-active libvirtd && echo "✅ libvirtd 服务运行中" || echo "❌ libvirtd 服务未运行"
echo ""
echo "4. 检查默认网络"
virsh net-list --all | grep default
echo ""
echo "5. 检查虚拟网桥"
ip addr show virbr0 2>/dev/null && echo "✅ virbr0 网桥存在" || echo "❌ virbr0 网桥不存在"
echo ""
echo "6. 检查 firewalld 状态"
sudo firewall-cmd --state`,
                    language: 'bash',
                  },
                ],
              },
            ],
          },
          arch: {
            online: [
              {
                stepNumber: 1,
                title: '快速诊断脚本',
                description: '一键运行完整的网络诊断，快速定位问题。',
                codeBlocks: [
                  {
                    title: '完整网络诊断脚本',
                    description: '检查 KVM 网络的所有关键组件。',
                    code: `#!/bin/bash
echo "=== KVM 网络诊断 ==="
echo ""
echo "1. 检查虚拟化支持"
egrep -q 'vmx|svm' /proc/cpuinfo && echo "✅ CPU 支持虚拟化" || echo "❌ CPU 不支持虚拟化"
echo ""
echo "2. 检查 KVM 模块"
lsmod | grep kvm && echo "✅ KVM 模块已加载" || echo "❌ KVM 模块未加载"
echo ""
echo "3. 检查 libvirt 服务"
sudo systemctl is-active libvirtd && echo "✅ libvirtd 服务运行中" || echo "❌ libvirtd 服务未运行"
echo ""
echo "4. 检查默认网络"
virsh net-list --all | grep default
echo ""
echo "5. 检查虚拟网桥"
ip addr show virbr0 2>/dev/null && echo "✅ virbr0 网桥存在" || echo "❌ virbr0 网桥不存在"`,
                    language: 'bash',
                  },
                ],
              },
            ],
          },
        },
      },
    ],
  },
];
