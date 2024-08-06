# starterkit-mfehost-motifreact-ts-fabric

## Purpose

The purpose of this template is to provide a repository with the necessary basic packages to create an app that hosts microfrontends. It is updated with Motif 6, React 18, and Webpack's Module Federations to enable the consumption of microfrontends. By default, it includes the Header ([GitHub Repo](https://github.com/ey-org/mfe-ui-header)) and the Footer ([GitHub Repo](https://github.com/ey-org/mfe-ui-footer)) as usage examples, but you can use any other microfrontend to create different apps. It also has a devcontainer.json file to be able to launch a codespace that automatically installs the necessary packages to run the app.

## Running the Project in Codespaces

[Codespaces](https://github.com/features/codespaces) is a powerful development environment provided by GitHub that allows you to develop, build, and run your project directly in the cloud. Here's how to launch your project in Codespaces:

1. **Accessing Codespaces:**

   - Navigate to your repository on GitHub.
   - Click Code and Codespaces

![1code](https://github.com/ey-org/starterkit-mfehost-motifreact-ts-fabric/assets/132896842/6be88131-b30a-494e-a6b9-af38387b8f7e)

   - Select the plus symbol icon from the dropdown menu.

![image](https://github.com/ey-org/starterkit-mfehost-motifreact-ts-fabric/assets/132896842/d0c503fa-ff2e-428d-b70f-d263436e0bd4)



2. **Initialization:**

   -Once you click the plus icon the codespace will be created and started automatically. Your repository already includes a `devcontainer.json` file located in `.devcontainer/`, which defines the  
    development environment for Codespaces. This file specifies the required dependencies, extensions, and settings for your project.

3. **Accessing Your Codespaces Environment:**

   - You can access your Codespaces environment from anywhere with an internet connection.
     - Open it directly in your web browser.
     - Or, if you prefer, open it in Visual Studio Code by installing the "Codespaces" extension and selecting "Open Codespace" from the command palette.

By following these steps, you can seamlessly develop and test your project in a cloud-based environment using GitHub Codespaces. It's a convenient way to collaborate with others and ensure consistency across different development environments.

## Running the Project locally

1. Run the following command to generate authentication token for Motif library.

```
npm login --registry=https://eyctpeu.jfrog.io/artifactory/api/npm/eyctxd-motif-npm-prod-eu/ --scope=@ey-xd
```

2. Run the following command to generate authentication token for Core library.

```
npm login --registry=https://eyctpeu.jfrog.io/artifactory/api/npm/ey-microapp-platform-npm-prod-eu/ --scope=@ey
```

3. Run the following command to install the necessary packages.

```
npm install
```

4. Run the following command to run the application locally. By default the application will run in port 3001, you can change it by editing the env.local file inside environments folder.

```
npm run start:local
```
## Artifactory - Jfrog X-Ray VSCode extension Installation guide
Please follow the document link to install VSCode extension : [Document Link](https://explore.eyfabric.ey.com/eydx/content/5fb3e6db-6ee1-4b31-9038-218f0a2859dd)
