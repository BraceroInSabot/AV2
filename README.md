# AV2

_Transforming Ideas into Seamless Digital Realities_

![last-commit](https://img.shields.io/github/last-commit/BraceroInSabot/AV2?style=flat&logo=git&logoColor=white&color=0080ff)
![repo-top-language](https://img.shields.io/github/languages/top/BraceroInSabot/AV2?style=flat&color=0080ff)
![repo-language-count](https://img.shields.io/github/languages/count/BraceroInSabot/AV2?style=flat&color=0080ff)

_Built with the tools and technologies:_

![JSON](https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white)
![Markdown](https://img.shields.io/badge/Markdown-000000.svg?style=flat&logo=Markdown&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20.svg?style=flat&logo=Django&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-1AD1A5.svg?style=flat&logo=DaisyUI&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED.svg?style=flat&logo=Docker&logoColor=white)

![Python](https://img.shields.io/badge/Python-3776AB.svg?style=flat&logo=Python&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=Vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white)
![YAML](https://img.shields.io/badge/YAML-CB171E.svg?style=flat&logo=YAML&logoColor=white)

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Testing](#testing)

---

## Overview

AV2 is an all-in-one developer toolset that simplifies the development, orchestration, and deployment of complex web applications. It seamlessly integrates multi-service architecture management with Docker Compose, a modern frontend built with Solid.js, TailwindCSS, and Vite, and a robust Django backend supporting REST APIs and administrative management.

**Why AV2?**

This project aims to streamline the entire web development lifecycle. The core features include:

- 🧩 **Docker Compose Orchestration:** Manages backend, frontend, and database containers for smooth development and deployment.
- 🚀 **Modern Frontend Stack:** Utilizes Vite, Solid.js, TailwindCSS, and DaisyUI for fast, responsive, and maintainable UI development.
- 🛠️ **Powerful Backend:** Built with Django, offering REST API endpoints, data models, and admin interface for organizational data management.
- 🔄 **Integrated Workflow:** Facilitates seamless local development, testing, and deployment with clear project structure.
- 🔒 **Scalable & Maintainable:** Designed for growth, supporting scalable architectures with clean separation of concerns.

---

## Getting Started

### Prerequisites

This project requires the following dependencies:

- **Programming Language:** Python
- **Package Manager:** Npm, Pip
- **Container Runtime:** Docker

### Installation

Build AV2 from the source and install dependencies:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/BraceroInSabot/AV2
   ```

2. **Navigate to the project directory:**

   ```sh
   cd AV2
   ```

3. **Install the dependencies:**

**Using [docker](https://www.docker.com/):**

```sh
docker-compose up  --build
```

**Using [npm](https://www.npmjs.com/):**

```sh
npm install
```

**Using [pip](https://pypi.org/project/pip/):**

```sh
pip install -r Backend/requirements.txt
```

### Usage

Run the project with:

**Using [docker](https://www.docker.com/):**

```sh
docker ps
```

> Access localhost:3000. Remember to run the backend!

**Using [npm](https://www.npmjs.com/):**

```sh
npm run dev -- --host
```

**Using [pip](https://pypi.org/project/pip/):**

```sh
cd .\Backend\ && python manage.py migrate && python manage.py makemigrations && python manage.py runserver
```

---

[⬆ Return to top](#av2)
