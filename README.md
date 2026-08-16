# Cloud Native System Design

A highly available, scalable, and secure cloud architecture built on
**Amazon Web Services (AWS)**. The project demonstrates how to deploy a
modern web application using a multi-AZ VPC, Application Load Balancer,
EC2, Auto Scaling, CloudWatch, SNS, Nginx, and related AWS networking
and security components.

## 🚀 Project Overview

The system is designed to eliminate single points of failure and handle
changing workloads efficiently.

Users access the application through the internet. Requests are routed
through an **Application Load Balancer (ALB)** to healthy **EC2
instances** running across multiple Availability Zones. **Auto Scaling**
adds or removes instances based on CPU utilization, while **CloudWatch**
monitors the infrastructure and **SNS** sends alerts to administrators.

### Main Architecture Flow

``` text
Users
  |
  v
Internet Gateway
  |
  v
Application Load Balancer
  |
  +-------------------+
  |                   |
  v                   v
EC2 - AZ A          EC2 - AZ B
  |                   |
  +---------+---------+
            |
            v
      Auto Scaling Group
            |
            v
        CloudWatch
            |
            v
           SNS
            |
            v
      Email Notifications
```

## ☁️ AWS Services Used

  -----------------------------------------------------------------------
  Service                             Purpose
  ----------------------------------- -----------------------------------
  **Amazon VPC**                      Provides an isolated cloud network

  **Amazon EC2**                      Hosts the application servers

  **Application Load Balancer**       Distributes traffic across healthy
                                      EC2 instances

  **Auto Scaling**                    Automatically increases or
                                      decreases EC2 capacity

  **Security Groups**                 Controls inbound and outbound
                                      traffic

  **Amazon CloudWatch**               Monitors metrics, logs, and scaling
                                      conditions

  **Amazon SNS**                      Sends administrator notifications

  **Internet Gateway**                Provides internet connectivity

  **NAT Gateway**                     Supports outbound connectivity for
                                      private resources

  **Amazon S3**                       Used for audit/logging storage

  **Ubuntu Linux**                    Operating system for EC2 instances

  **Nginx**                           Web server and reverse proxy

  **PM2**                             Runs and manages the Node.js
                                      application
  -----------------------------------------------------------------------

## 🏗️ Architecture

The infrastructure is deployed inside a VPC using the following network
design:

-   **VPC CIDR:** `10.0.0.0/16`
-   Public subnets for the Application Load Balancer
-   Private subnets for EC2 application servers
-   Route tables for traffic management
-   Internet Gateway for external connectivity
-   NAT Gateway for private subnet outbound access
-   Multiple Availability Zones for fault tolerance

The architecture uses security groups to restrict access. The ALB
accepts HTTP/HTTPS traffic, while the server security group is
configured so application servers are accessed through the load
balancer.

## ⚖️ Load Balancing

The Application Load Balancer distributes incoming requests across EC2
instances in the target group.

Health checks ensure that traffic is sent only to healthy servers.

This provides:

-   High availability
-   Better traffic distribution
-   Fault tolerance
-   Improved application responsiveness

## 📈 Auto Scaling

The Auto Scaling Group automatically adjusts the number of EC2 instances
according to workload.

### Configuration

-   **Initial/desired capacity:** 2 instances
-   **Maximum capacity:** 6 instances
-   **Scale out:** CPU utilization greater than 70%
-   **Scale in:** CPU utilization below 20%

During high traffic, new EC2 instances are launched automatically. When
demand decreases, unnecessary instances are removed.

## 🔐 Security

Security is implemented using AWS network isolation and Security Groups.

Key controls include:

-   VPC-based network isolation
-   Public and private subnet separation
-   Restricted inbound traffic
-   ALB-based access to application servers
-   HTTP/HTTPS access through the load balancer
-   SSH access restricted for administration
-   Controlled outbound traffic

> **Security Note:** Do not commit AWS access keys, private keys, `.pem`
> files, passwords, or other secrets to this repository.

## 🖥️ Application Server

The EC2 launch configuration installs:

-   Git
-   cURL
-   Nginx
-   Node.js 18
-   PM2

The application is cloned from the GitHub repository and started using
PM2.

The Nginx configuration forwards incoming HTTP requests to the Node.js
application running on:

``` text
http://127.0.0.1:3000
```

## ⚙️ Automated EC2 Setup

The server initialization process performs the following steps:

``` text
Update Ubuntu
    ↓
Install Git, cURL and Nginx
    ↓
Install Node.js 18
    ↓
Install PM2
    ↓
Clone application repository
    ↓
Install npm dependencies
    ↓
Start application using PM2
    ↓
Configure Nginx reverse proxy
    ↓
Start and enable Nginx
```

Example deployment commands used by the project:

``` bash
git clone https://github.com/subasangeeth/open-lab.git
cd open-lab
npm install
pm2 start app.js --name cloud-app
pm2 save
```

## 📊 Monitoring and Alerts

**Amazon CloudWatch** monitors infrastructure metrics such as CPU
utilization, network activity, and application/server health.

CloudWatch alarms are connected to Auto Scaling policies and SNS
notifications.

Example:

``` text
High CPU Usage
      ↓
CloudWatch Alarm
      ↓
Auto Scaling
      ↓
Launch Additional EC2 Instance
      ↓
SNS Notification
      ↓
Administrator Email
```

The project also demonstrates stress testing by increasing server CPU
load and observing the Auto Scaling response.

## 🧪 Testing

The project includes several testing levels.

### Unit Testing

Individual components are tested independently:

-   EC2
-   Auto Scaling
-   Security Groups

### Integration Testing

AWS services are tested together:

-   ALB + EC2
-   CloudWatch + Auto Scaling
-   CloudWatch + SNS

### Functional Testing

The complete system is tested for:

-   User access
-   Load balancing
-   High availability
-   Monitoring

### Performance Testing

The system is tested under concurrent and peak-load conditions to
verify:

-   Response time
-   Load handling
-   Auto Scaling behavior
-   System stability

## ✅ Expected Results

The implemented architecture demonstrates:

-   High availability across Availability Zones
-   Traffic distribution through ALB
-   Automatic EC2 scaling
-   Health-based traffic routing
-   Real-time CloudWatch monitoring
-   SNS email notifications
-   Secure network configuration
-   Improved fault tolerance

## 📁 Suggested Repository Structure

``` text
open-lab/
├── app.js
├── package.json
├── package-lock.json
├── README.md
└── ...
```

The exact repository structure may vary depending on the application
files added to the project.

## 🛠️ Local Development

### Prerequisites

Install:

-   Node.js
-   npm
-   Git

### Clone the Repository

``` bash
git clone https://github.com/subasangeeth/open-lab.git
cd open-lab
```

### Install Dependencies

``` bash
npm install
```

### Start the Application

``` bash
node app.js
```

The project configuration uses port `3000` for the Node.js application
behind Nginx.

## ☁️ AWS Deployment Overview

A typical deployment sequence is:

1.  Create the VPC.
2.  Create public and private subnets across Availability Zones.
3.  Configure route tables, Internet Gateway, and NAT Gateway.
4.  Create Security Groups.
5.  Create the EC2 launch template.
6.  Configure the application server and Nginx.
7.  Create the target group.
8.  Create the Application Load Balancer.
9.  Create the Auto Scaling Group.
10. Configure CloudWatch alarms and scaling policies.
11. Configure SNS notifications.
12. Test ALB health checks and application access.
13. Perform a stress test and verify scale-out/scale-in behavior.

## 📌 Project Modules

-   **User Access Module** --- Handles incoming user requests.
-   **Load Balancer Module** --- Distributes traffic using ALB.
-   **Compute Module** --- Runs the application on EC2.
-   **Auto Scaling Module** --- Adjusts server capacity according to
    demand.
-   **Security Module** --- Controls network access using Security
    Groups.
-   **Monitoring Module** --- Uses CloudWatch for infrastructure
    monitoring.
-   **Logging Module** --- Uses S3 for audit/logging storage.
-   **Notification Module** --- Uses SNS for alerts.

## 🔮 Future Enhancements

The project can be extended with:

-   Docker containerization
-   Kubernetes orchestration
-   AWS Lambda/serverless architecture
-   Amazon CloudFront CDN
-   AWS WAF
-   Advanced threat detection
-   Jenkins or AWS CodePipeline CI/CD
-   Centralized monitoring dashboards
-   Advanced logging and observability

## 🎓 Project Purpose

This project demonstrates practical implementation of **cloud-native
architecture principles**, including scalability, high availability,
fault tolerance, security, monitoring, and automated resource management
using AWS.

It is suitable as an academic cloud computing project and as a practical
demonstration of AWS infrastructure concepts.

## 📚 References

-   AWS cloud services documentation
-   *Mastering Cloud Computing*, Rajkumar Buyya, 2nd Edition
-   IEEE Computer Society --- SWEBOK V4
-   Project documentation and implementation results

## 👨‍💻 Author

**Subasangeeth**

GitHub: [subasangeeth](https://github.com/subasangeeth)

------------------------------------------------------------------------

⭐ If you find this project useful, consider giving the repository a
star.
