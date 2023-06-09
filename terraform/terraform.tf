terraform {
  required_version = "~> 1.4"

  cloud {
    organization = "statstag"

    workspaces {
      name = "prod"
    }
  }

  required_providers {
    fly = {
      source  = "fly-apps/fly"
      version = "~> 0.0"
    }
  }
}

provider "fly" {
  useinternaltunnel    = true
  internaltunnelorg    = "personal"
  internaltunnelregion = "iad" # nova
}
