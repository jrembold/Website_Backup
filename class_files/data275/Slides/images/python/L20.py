import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib

plt.style.use('seaborn-v0_8-whitegrid')
matplotlib.rc('xtick', labelsize=16)
matplotlib.rc('ytick', labelsize=16)

def const_pdf():
    xs = np.linspace(0,5,1000)
    plt.figure(figsize=(8,8))
    plt.plot(xs, 1/5*np.ones(xs.size))
    plt.fill_between(xs, 0, 1/5, alpha=0.5)
    plt.title('Constant Probability Distribution')
    plt.ylim(0,1)
    plt.savefig('constant_pdf.png', facecolor='#ffffff00', bbox_inches='tight')
    plt.show()

if __name__ == '__main__':
    const_pdf()
