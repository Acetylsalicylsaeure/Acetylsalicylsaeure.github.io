The current SOTA model for text-guided molecule generation is Bio5T+, a transformer model. Given that a auto-regressive token transformer must surely be suboptimal for molecular graphs, I am currently trying to get a text-guided GNN to work for molecule generation. We shall see...

Current plan: use a autoregressive graph autoencoder to map graphs to a continuous latent space, and then condition a flow on said space to go from descriptive vectors -> conditioned embedding -> generated graph
