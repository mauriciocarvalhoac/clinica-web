# ClinicWeb

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.8.

## Dependencies
- ng add @ng-bootstrap/ng-bootstrap
- npm install --save @fortawesome/fontawesome-free
- npm install ngx-mask


### Subindo no Kubernetes

Para deployar no kubernetes localmente, execute o comando:

* docker build -t mauriciocarvalhoac/clinic-web:1.0.0 .
* docker pull mauriciocarvalhoac/clinic-web:1.0.0
* k3d image import mauriciocarvalhoac/clinic-web:1.0.0 -c clinic-app
* kubectl rollout restart deployment clinic-web