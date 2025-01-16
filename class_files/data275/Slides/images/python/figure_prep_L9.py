import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import curve_fit
plt.style.use(['seaborn-v0_8-darkgrid', 'seaborn-v0_8-poster'])


def gen_noisy_signal(gen_func, start, end, length, period, noise_frac=0.1):
    ts = np.linspace(start, end, length)
    data = gen_func(ts, period)
    max_data = max(data)
    noise = np.random.normal(0, noise_frac*max_data, data.size)
    return ts, data + noise

def square_wave(ts, period):
    data = np.ones(ts.size)
    for i in range(ts.size):
        if ts[i] % period < period/2:
            data[i] = -1
    return data

def sine_wave(ts, period):
    return np.sin(2*np.pi*ts/period)


def fit_and_plot_noise(func, period):
    ts, data = gen_noisy_signal(func, 0, 10, 1000, period)
    # ts, data = gen_noisy_signal(square_wave, 0, 10, 100, 5)

    fit, cov = curve_fit(func, ts, data, [5.05])

    plt.figure(figsize=(15,5))
    plt.plot(ts, data, '.')
    plt.plot(ts, func(ts, *fit))
    plt.title(f"Fit period of {fit[0]}")
    plt.xlabel('Time')
    plt.ylabel('Amplitude')
    plt.tight_layout()
    plt.savefig('test.png', facecolor='#FFFFFF00')
    plt.show()



def infinite_sine_and_transform():
    ts, data = gen_noisy_signal(sine_wave, 0, 1000, 100000, 2, noise_frac=0)
    ts, data2 = gen_noisy_signal(sine_wave, 0, 1000, 100000, 4, noise_frac=0)
    ff = np.fft.fftfreq(ts.size, d=1000/100000)
    ft = np.fft.fft(data, norm='ortho')
    ft2 = np.fft.fft(data2, norm='ortho')
    plt.figure(figsize=(15,5))
    plt.subplot(121)
    plt.plot(ts, data)
    plt.plot(ts, data2)
    plt.xlabel('Time')
    plt.ylabel('Amplitude')
    plt.xlim([0,10])
    plt.subplot(122)
    plt.plot(ff, abs(ft)**2)
    plt.plot(ff, abs(ft2)**2)
    plt.xlabel('Frequency')
    plt.ylabel('Power Spectrum')
    plt.xlim([0,1])
    plt.ylim([0,28000])
    plt.tight_layout()
    plt.savefig('inf_sin_and_trans.png', facecolor='#FFFFFF00')
    plt.show()


def continuous_square_wave_and_transform():
    ts = np.linspace(0,1000,100000)
    data = np.zeros(ts.size)
    data[1000:2000] = 1
    data2 = np.zeros(ts.size)
    data2[750:2250] = 1
    ff = np.fft.fftfreq(ts.size, d=1000/100000)
    ft2 = np.fft.fft(data2, norm='ortho')
    ft = np.fft.fft(data, norm='ortho')
    plt.figure(figsize=(15,5))
    plt.subplot(121)
    plt.plot(ts, data)
    plt.plot(ts, data2)
    plt.xlabel('Time')
    plt.ylabel('Amplitude')
    plt.xlim([0,30])
    plt.subplot(122)
    plt.plot(ff, abs(ft2)**2)
    plt.plot(ff, abs(ft)**2)
    plt.xlabel('Frequency')
    plt.ylabel('Power Spectrum')
    plt.xlim([-.5,.5])
    plt.tight_layout()
    plt.savefig('inf_square_and_trans.png', facecolor='#FFFFFF00')
    plt.show()


def multi_wave():
    ts, data = gen_noisy_signal(sine_wave, 0, 1000, 100000, 2, noise_frac=0)
    ts, data2 = gen_noisy_signal(sine_wave, 0, 1000, 100000, 5, noise_frac=0)
    ts, data3 = gen_noisy_signal(sine_wave, 0, 1000, 100000, 0.8, noise_frac=0)
    data = .5*data + data2 + .2*data3
    ff = np.fft.fftfreq(ts.size, d=1000/100000)
    ft = np.fft.fft(data, norm='ortho')
    plt.figure(figsize=(15,5))
    plt.subplot(111)
    plt.plot(ts, data)
    plt.xlabel('Time')
    plt.ylabel('Amplitude')
    plt.xlim([0,30])
    # plt.subplot(122)
    # plt.plot(ff, abs(ft)**2)
    # plt.xlabel('Frequency')
    # plt.ylabel('Power Spectrum')
    # plt.xlim([-2,2])
    plt.tight_layout()
    plt.savefig('multi_wave.png', facecolor='#FFFFFF00')
    plt.show()

    df = pd.DataFrame({'time_s': ts, 'amp': data})
    df.to_csv('multi_wave.csv', index=False)



if __name__ == '__main__':
    # fit_and_plot_noise(sine_wave, 5)    
    # infinite_sine_and_transform()
    # continuous_square_wave_and_transform()
    multi_wave()
