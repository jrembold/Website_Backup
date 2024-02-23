import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib

plt.style.use('seaborn-v0_8-whitegrid')
matplotlib.rc('xtick', labelsize=16)
matplotlib.rc('ytick', labelsize=16)


def gen_data():
    xs = np.sort(np.random.uniform(-5,5,size=100))
    a_true = -3
    b_true = 5
    dev = np.random.normal(0,10, size=xs.size)
    y_true = a_true * xs ** 2 + b_true * xs
    y = y_true + dev
    errs = np.abs(y-y_true + np.random.normal(0,1,size=xs.size))

    data = pd.DataFrame({'x': xs, 'y': y, 'y_err': errs})
    data.to_csv('mcmc_fit_example.csv', index=False)

    plt.errorbar(xs, y, yerr=errs, fmt='.')
    plt.savefig('mcmc_fit_example.png', facecolor='#ffffff00', bbox_inches='tight')
    plt.show()


if __name__ == '__main__':
    gen_data()
