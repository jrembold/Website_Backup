import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import random

plt.style.use(["seaborn-v0_8-darkgrid", "seaborn-v0_8-poster"])


def gen_review():
    ts = np.linspace(0, 1000, 100000)

    sinewave = np.sin(2 * np.pi * ts / 2)
    tophat = np.zeros(ts.shape)
    tophat[1000:2000] = 1
    gaussian = np.exp(-((ts - 15) ** 2) / (2 * 2**2))
    dirac_comb = np.zeros(ts.shape)
    dirac_comb[::200] = 1

    series = [sinewave, tophat, gaussian, dirac_comb]
    n = len(series)

    fig, axs = plt.subplots(figsize=(15, 2 * n), nrows=n, ncols=2)

    for i, s in enumerate(series):
        ff = np.fft.fftfreq(ts.size, d=1000 / 100000)
        ft = np.fft.fft(s)
        ftdf = pd.DataFrame({"freq": ff, "power": abs(ft) ** 2})
        ftdf = ftdf.sort_values("freq")
        axs[i, 0].tick_params(
            left=False, right=False, labelleft=False, labelbottom=False, bottom=False
        )
        axs[i, 0].plot(ts, s)
        axs[i, 0].set_xlim([0, 30])
        axs[i, 1].tick_params(
            left=False, right=False, labelleft=False, labelbottom=False, bottom=False
        )
        axs[i, 1].plot(ftdf.freq, ftdf.power, color="C4")
        axs[i, 1].set_xlim([-1, 1])

    plt.tight_layout()
    plt.savefig("important_fts.png", facecolor="#FFFFFF00")
    plt.show()


def gen_conv1():
    ts = np.linspace(0, 1000, 100000)
    sinewave = np.sin(2 * np.pi * ts / 2)
    tophat = np.zeros(ts.shape)
    tophat[1000:2000] = 1

    f = pd.DataFrame({"time": ts, "signal": sinewave})
    g = pd.DataFrame({"time": ts, "signal": tophat})

    fig, axs = plt.subplots(figsize=(16, 9), nrows=3, ncols=2)

    fff = np.fft.fftfreq(ts.size, d=1000 / 100000)
    fft = np.fft.fft(f.signal)
    fftdf = pd.DataFrame({"freq": fff, "power": abs(fft) ** 2})
    fftdf = fftdf.sort_values("freq")

    gff = np.fft.fftfreq(ts.size, d=1000 / 100000)
    gft = np.fft.fft(g.signal)
    gftdf = pd.DataFrame({"freq": gff, "power": abs(gft) ** 2})
    gftdf = gftdf.sort_values("freq")

    axs[0, 0].tick_params(
        left=False, right=False, labelleft=False, labelbottom=False, bottom=False
    )
    axs[0, 0].plot(ts, f.signal)
    axs[0, 0].set_xlim([0, 30])
    axs[0, 1].tick_params(
        left=False, right=False, labelleft=False, labelbottom=False, bottom=False
    )
    axs[0, 1].plot(fftdf.freq, fftdf.power, color="C4")
    axs[0, 1].set_xlim([-1, 1])

    axs[1, 0].tick_params(
        left=False, right=False, labelleft=False, labelbottom=False, bottom=False
    )
    axs[1, 0].plot(ts, g.signal)
    axs[1, 0].set_xlim([0, 30])
    axs[1, 1].tick_params(
        left=False, right=False, labelleft=False, labelbottom=False, bottom=False
    )
    axs[1, 1].plot(gftdf.freq, gftdf.power, color="C4")
    axs[1, 1].set_xlim([-1, 1])

    axs[2, 0].tick_params(
        left=False, right=False, labelleft=False, labelbottom=False, bottom=False
    )
    axs[2, 0].plot(ts, g.signal * f.signal)
    axs[2, 0].set_xlim([0, 30])
    axs[2, 1].tick_params(
        left=False, right=False, labelleft=False, labelbottom=False, bottom=False
    )
    axs[2, 1].plot(
        gftdf.freq, np.convolve(fftdf.power, gftdf.power, "same"), color="C4"
    )
    axs[2, 1].set_xlim([-1, 1])

    plt.savefig("conv1.svg", facecolor="#FFFFFF00")
    plt.show()


def gen_conv2():
    ts = np.linspace(0, 1000, 100000)
    gaussian = np.exp(-((ts - 15) ** 2) / (2 * 2**2))
    diract = np.zeros(ts.shape)
    diract[::200] = 1

    f = pd.DataFrame({"time": ts, "signal": gaussian})
    g = pd.DataFrame({"time": ts, "signal": diract})

    fig, axs = plt.subplots(figsize=(16, 9), nrows=3, ncols=2)

    fff = np.fft.fftfreq(ts.size, d=1000 / 100000)
    fft = np.fft.fft(f.signal)
    fftdf = pd.DataFrame({"freq": fff, "power": abs(fft) ** 2})
    fftdf = fftdf.sort_values("freq")

    gff = np.fft.fftfreq(ts.size, d=1000 / 100000)
    gft = np.fft.fft(g.signal)
    gftdf = pd.DataFrame({"freq": gff, "power": abs(gft) ** 2})
    gftdf = gftdf.sort_values("freq")

    axs[0, 0].tick_params(
        left=False, right=False, labelleft=False, labelbottom=False, bottom=False
    )
    axs[0, 0].plot(ts, f.signal)
    axs[0, 0].set_xlim([0, 30])
    axs[0, 1].tick_params(
        left=False, right=False, labelleft=False, labelbottom=False, bottom=False
    )
    axs[0, 1].plot(fftdf.freq, fftdf.power, color="C4")
    axs[0, 1].set_xlim([-1, 1])

    axs[1, 0].tick_params(
        left=False, right=False, labelleft=False, labelbottom=False, bottom=False
    )
    axs[1, 0].plot(ts, g.signal)
    axs[1, 0].set_xlim([0, 30])
    axs[1, 1].tick_params(
        left=False, right=False, labelleft=False, labelbottom=False, bottom=False
    )
    axs[1, 1].plot(gftdf.freq, gftdf.power, color="C4")
    axs[1, 1].set_xlim([-1, 1])

    axs[2, 0].tick_params(
        left=False, right=False, labelleft=False, labelbottom=False, bottom=False
    )
    axs[2, 0].plot(ts, g.signal * f.signal, ".-")
    axs[2, 0].set_xlim([0, 30])
    axs[2, 1].tick_params(
        left=False, right=False, labelleft=False, labelbottom=False, bottom=False
    )
    axs[2, 1].plot(
        gftdf.freq, np.convolve(fftdf.power, gftdf.power, "same"), color="C4"
    )
    axs[2, 1].set_xlim([-1, 1])

    plt.savefig("conv2.svg", facecolor="#FFFFFF00")
    plt.show()


def gen_conv3():
    ts = np.linspace(0, 1000, 100000)
    gaussian = np.exp(-((ts - 15) ** 2) / (2 * 2**2))
    diract = np.zeros(ts.shape)
    diract[::500] = 1

    f = pd.DataFrame({"time": ts, "signal": gaussian})
    g = pd.DataFrame({"time": ts, "signal": diract})

    fig, axs = plt.subplots(figsize=(16, 9), nrows=3, ncols=2)

    fff = np.fft.fftfreq(ts.size, d=1000 / 100000)
    fft = np.fft.fft(f.signal)
    fftdf = pd.DataFrame({"freq": fff, "power": abs(fft) ** 2})
    fftdf = fftdf.sort_values("freq")

    gff = np.fft.fftfreq(ts.size, d=1000 / 100000)
    gft = np.fft.fft(g.signal)
    gftdf = pd.DataFrame({"freq": gff, "power": abs(gft) ** 2})
    gftdf = gftdf.sort_values("freq")

    axs[0, 0].tick_params(
        left=False, right=False, labelleft=False, labelbottom=False, bottom=False
    )
    axs[0, 0].plot(ts, f.signal)
    axs[0, 0].set_xlim([0, 30])
    axs[0, 1].tick_params(
        left=False, right=False, labelleft=False, labelbottom=False, bottom=False
    )
    axs[0, 1].plot(fftdf.freq, fftdf.power, color="C4")
    axs[0, 1].set_xlim([-1, 1])

    axs[1, 0].tick_params(
        left=False, right=False, labelleft=False, labelbottom=False, bottom=False
    )
    axs[1, 0].plot(ts, g.signal)
    axs[1, 0].set_xlim([0, 30])
    axs[1, 1].tick_params(
        left=False, right=False, labelleft=False, labelbottom=False, bottom=False
    )
    axs[1, 1].plot(gftdf.freq, gftdf.power, color="C4")
    axs[1, 1].set_xlim([-1, 1])

    axs[2, 0].tick_params(
        left=False, right=False, labelleft=False, labelbottom=False, bottom=False
    )
    axs[2, 0].plot(ts, g.signal * f.signal, ".-")
    axs[2, 0].set_xlim([0, 30])
    axs[2, 1].tick_params(
        left=False, right=False, labelleft=False, labelbottom=False, bottom=False
    )
    axs[2, 1].plot(
        gftdf.freq, np.convolve(fftdf.power, gftdf.power, "same"), color="C4"
    )
    axs[2, 1].set_xlim([-1, 1])

    plt.savefig('conv3.svg', facecolor='#FFFFFF00')
    plt.show()


def gen_conv4():
    ts = np.linspace(0, 1000, 50000)
    gaussian = np.exp(-((ts - 15) ** 2) / (2 * 2**2))
    diract = np.zeros(ts.shape)
    obs = random.sample(range(len(diract)), k=100)
    print(obs)
    diract[obs] = 1

    f = pd.DataFrame({"time": ts, "signal": gaussian})
    g = pd.DataFrame({"time": ts, "signal": diract})

    fig, axs = plt.subplots(figsize=(16, 9), nrows=3, ncols=2)

    fff = np.fft.fftfreq(ts.size, d=1000 / 100000)
    fft = np.fft.fft(f.signal)
    fftdf = pd.DataFrame({"freq": fff, "power": abs(fft) ** 2})
    fftdf = fftdf.sort_values("freq")

    gff = np.fft.fftfreq(ts.size, d=1000 / 100000)
    gft = np.fft.fft(g.signal)
    gftdf = pd.DataFrame({"freq": gff, "power": abs(gft) ** 2})
    gftdf = gftdf.sort_values("freq")

    axs[0, 0].tick_params(
        left=False, right=False, labelleft=False, labelbottom=False, bottom=False
    )
    axs[0, 0].plot(ts, f.signal)
    axs[0, 0].set_xlim([0, 30])
    axs[0, 1].tick_params(
        left=False, right=False, labelleft=False, labelbottom=False, bottom=False
    )
    axs[0, 1].plot(fftdf.freq, fftdf.power, color="C4")
    axs[0, 1].set_xlim([-1, 1])

    axs[1, 0].tick_params(
        left=False, right=False, labelleft=False, labelbottom=False, bottom=False
    )
    axs[1, 0].plot(ts, g.signal)
    axs[1, 0].set_xlim([0, 30])
    axs[1, 1].tick_params(
        left=False, right=False, labelleft=False, labelbottom=False, bottom=False
    )
    axs[1, 1].plot(gftdf.freq, gftdf.power, color="C4")
    axs[1, 1].set_xlim([-1, 1])

    axs[2, 0].tick_params(
        left=False, right=False, labelleft=False, labelbottom=False, bottom=False
    )
    axs[2, 0].plot(ts, g.signal * f.signal, ".-")
    axs[2, 0].set_xlim([0, 30])
    axs[2, 1].tick_params(
        left=False, right=False, labelleft=False, labelbottom=False, bottom=False
    )
    axs[2, 1].plot(
        gftdf.freq, np.convolve(fftdf.power, gftdf.power, "same"), color="C4"
    )
    axs[2, 1].set_xlim([-1, 1])

    plt.savefig('conv4.svg', facecolor='#FFFFFF00')
    plt.show()

if __name__ == "__main__":
    # gen_review()
    # gen_conv1()
    # gen_conv2()
    # gen_conv3()
    gen_conv4()
