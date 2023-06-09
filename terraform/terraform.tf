terraform {
  required_version = "~> 1.4"

  cloud {
    organization = "statstag"

    workspaces {
      name = "prod"
    }
  }

  required_providers {
    random = {
      source  = "hashicorp/random"
      version = "~> 3.5"
    }
  }
}

provider "random" {}
