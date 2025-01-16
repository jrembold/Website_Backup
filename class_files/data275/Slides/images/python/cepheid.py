import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib

plt.style.use('seaborn-v0_8-whitegrid')
matplotlib.rc('xtick', labelsize=16)
matplotlib.rc('ytick', labelsize=16)

df = pd.read_csv('./cepheid.csv', names=['V1', 'V2'], delimiter=' ')

fig = plt.figure(figsize=(16, 4), dpi=96)
plt.plot(df.V1, df.V2, '.', markersize=15)
plt.xlabel('Period (days)', fontsize=18)
plt.ylabel('Apparent Magnitude', fontsize=18)
plt.savefig('cepheid.png', facecolor='#ffffff00', bbox_inches='tight')
plt.show()
