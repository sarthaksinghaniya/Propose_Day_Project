"""
Utility functions for ML Explainability project.

This module contains helper functions for data loading, cleaning,
and preprocessing to support the explainability analysis notebooks.
"""

import pandas as pd
import numpy as np
from typing import List, Tuple, Dict, Any


def load_datasets(data_path: str = "../data/") -> Dict[str, pd.DataFrame]:
    """
    Load all datasets from the specified data directory.
    
    Args:
        data_path (str): Path to the data directory
        
    Returns:
        Dict[str, pd.DataFrame]: Dictionary containing loaded datasets
    """
    datasets = {}
    
    try:
        datasets['train'] = pd.read_csv(f"{data_path}train.csv")
        datasets['train1'] = pd.read_csv(f"{data_path}train1.csv")
        datasets['fifa'] = pd.read_csv(f"{data_path}FIFA_2018_Statistics.csv")
        
        print("All datasets loaded successfully!")
        for name, df in datasets.items():
            print(f"{name}: {df.shape}")
            
    except FileNotFoundError as e:
        print(f"Error loading datasets: {e}")
        return {}
    
    return datasets


def analyze_missing_values(df: pd.DataFrame, dataset_name: str = "") -> pd.DataFrame:
    """
    Analyze missing values in a DataFrame.
    
    Args:
        df (pd.DataFrame): Input DataFrame
        dataset_name (str): Name of the dataset for display
        
    Returns:
        pd.DataFrame: Missing values summary
    """
    missing_values = df.isnull().sum()
    missing_percentage = (missing_values / len(df)) * 100
    
    missing_df = pd.DataFrame({
        'Missing Count': missing_values,
        'Missing Percentage': missing_percentage
    })
    
    if dataset_name:
        print(f"\n=== {dataset_name} - Missing Values ===")
    
    return missing_df[missing_df['Missing Count'] > 0]


def get_column_types(df: pd.DataFrame) -> Tuple[List[str], List[str]]:
    """
    Separate categorical and numerical columns.
    
    Args:
        df (pd.DataFrame): Input DataFrame
        
    Returns:
        Tuple[List[str], List[str]]: (categorical_columns, numerical_columns)
    """
    categorical_cols = df.select_dtypes(include=['object', 'category']).columns.tolist()
    numerical_cols = df.select_dtypes(include=['int64', 'float64']).columns.tolist()
    
    return categorical_cols, numerical_cols


def basic_cleaning(df: pd.DataFrame) -> pd.DataFrame:
    """
    Perform basic data cleaning operations.
    
    Args:
        df (pd.DataFrame): Input DataFrame
        
    Returns:
        pd.DataFrame: Cleaned DataFrame
    """
    print(f"Original shape: {df.shape}")
    
    # Remove duplicate rows
    df_cleaned = df.drop_duplicates()
    print(f"After removing duplicates: {df_cleaned.shape}")
    
    return df_cleaned


def summarize_dataset(df: pd.DataFrame, dataset_name: str = "") -> Dict[str, Any]:
    """
    Generate a comprehensive summary of the dataset.
    
    Args:
        df (pd.DataFrame): Input DataFrame
        dataset_name (str): Name of the dataset
        
    Returns:
        Dict[str, Any]: Dataset summary
    """
    categorical_cols, numerical_cols = get_column_types(df)
    
    summary = {
        'shape': df.shape,
        'total_columns': len(df.columns),
        'categorical_columns': len(categorical_cols),
        'numerical_columns': len(numerical_cols),
        'missing_values': df.isnull().sum().sum(),
        'duplicate_rows': df.duplicated().sum(),
        'memory_usage': df.memory_usage(deep=True).sum()
    }
    
    if dataset_name:
        print(f"\n=== {dataset_name} Summary ===")
        for key, value in summary.items():
            print(f"{key.replace('_', ' ').title()}: {value}")
    
    return summary


def safe_feature_importance(model, feature_names: List[str]) -> pd.DataFrame:
    """
    Safely extract feature importance from a trained model.
    
    Args:
        model: Trained scikit-learn model
        feature_names (List[str]): List of feature names
        
    Returns:
        pd.DataFrame: Feature importance DataFrame
    """
    try:
        if hasattr(model, 'feature_importances_'):
            importance = model.feature_importances_
        elif hasattr(model, 'coef_'):
            importance = np.abs(model.coef_[0])
        else:
            raise ValueError("Model does not have feature_importances_ or coef_ attribute")
        
        importance_df = pd.DataFrame({
            'feature': feature_names,
            'importance': importance
        }).sort_values('importance', ascending=False)
        
        return importance_df
        
    except Exception as e:
        print(f"Error extracting feature importance: {e}")
        return pd.DataFrame()


if __name__ == "__main__":
    # Example usage
    print("ML Explainability Utils Module")
    print("This module provides utility functions for data analysis and preprocessing.")
