{ pkgs ? import <nixpkgs> { } }:

let
  nodeVersion = "24";  # Change this to your desired Node.js version
in

pkgs.mkShell {
  name = "nodejs-project-shell";

  # Specify the Node.js version
  buildInputs = [
    pkgs."nodejs_${nodeVersion}"
    pkgs.nodePackages.npm  # Ensure npm is available
    pkgs.nodePackages.typescript  # Optional: if you use TypeScript
    pkgs.nodePackages.typescript-language-server  # Optional: for TS LSP
  ];

  # Environment variables
  shellHook = ''
    export PATH="$PWD/node_modules/.bin:$PATH"
    echo "Node.js environment ready!"
    echo "Node.js version: $(node --version)"
    echo "npm version: $(npm --version)"
  '';

  # For better compatibility with node-gyp and native modules
  NIX_LDFLAGS = "-L${pkgs.stdenv.cc.cc.lib}/lib";
  
  # Set npm config to use nix-provided Python for node-gyp
  npm_config_python = "${pkgs.python3}/bin/python";

  # Optional: If you need specific environment variables
  MY_PROJECT_ENV = "development";
}
