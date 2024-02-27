library(stats)

fftfreq <- function(n, d) {
    val <- 1 / (n * d)
    N <- floor((n-1) / 2) + 1
    p1 <- seq(0, N-1)
    p2 <- seq(-floor(n/2), -1)
    tot <- c(p1,p2)
    return(tot * val)
}

rfft <- function(signal) {
    values <- fft(signal)
    N <- length(values)
    return(values[1:floor(N/2)])
}

rfftfreq <- function(n,d) {
    val <- 1 / (n * d)
    N <- floor((n-1) / 2) + 1
    p1 <- seq(0, N-1)
    return(p1 * val)
}
