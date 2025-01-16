import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib

plt.style.use('seaborn-v0_8-whitegrid')
matplotlib.rc('xtick', labelsize=16)
matplotlib.rc('ytick', labelsize=16)


def gen_data():
    xs = np.sort(np.random.uniform(-5,5,size=50))
    a_true = -1.5
    b_true = 5
    y_true = a_true * xs ** 2 + b_true * xs
    dev = np.random.normal(0, 20, size=xs.size)
    y = y_true + dev
    errs = np.abs(1.5*dev + np.random.normal(0,1,size=xs.size))

    data = pd.DataFrame({'x': xs, 'y': y, 'y_err': errs})
    data.to_csv('mcmc_fit_example.csv', index=False)

    plt.errorbar(xs, y, yerr=errs, fmt='.')
    plt.xlabel('x', fontsize=22)
    plt.ylabel('y', fontsize=22)
    plt.savefig('mcmc_fit_example.png', facecolor='#ffffff00', bbox_inches='tight')
    plt.show()


if __name__ == '__main__':
    gen_data()
