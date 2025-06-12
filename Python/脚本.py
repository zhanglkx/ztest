# -*- coding: utf-8 -*-
import os
import re
from pypinyin import pinyin, Style

def chinese_to_pinyin_filename(text):
    """将中文转换为适合文件名的拼音"""
    # 匹配中文字符
    chinese_pattern = re.compile(r'[\u4e00-\u9fff]+')
    
    def replace_chinese(match):
        chinese_text = match.group()
        # 转换为拼音，不带声调，首字母大写
        pinyin_list = pinyin(chinese_text, style=Style.NORMAL)
        return ''.join([item[0].capitalize() for item in pinyin_list])
    
    return chinese_pattern.sub(replace_chinese, text)

def is_safe_to_rename(old_path, new_path):
    """检查重命名是否安全"""
    if os.path.exists(new_path) and old_path != new_path:
        return False, "目标文件已存在: {}".format(new_path)
    return True, ""

def rename_files_in_folder(folder_path):
    """重命名文件夹中的所有文件"""
    if not os.path.exists(folder_path):
        print("文件夹不存在: {}".format(folder_path))
        return
    
    renamed_count = 0
    total_count = 0
    errors = []
    
    # 收集所有需要重命名的文件
    rename_list = []
    
    for root, dirs, files in os.walk(folder_path, topdown=False):
        # 处理文件
        for file in files:
            old_file_path = os.path.join(root, file)
            new_filename = chinese_to_pinyin_filename(file)
            new_file_path = os.path.join(root, new_filename)
            
            total_count += 1
            
            if old_file_path != new_file_path:
                rename_list.append((old_file_path, new_file_path, 'file'))
        
        # 处理文件夹名
        for dir_name in dirs:
            old_dir_path = os.path.join(root, dir_name)
            new_dirname = chinese_to_pinyin_filename(dir_name)
            new_dir_path = os.path.join(root, new_dirname)
            
            if old_dir_path != new_dir_path:
                rename_list.append((old_dir_path, new_dir_path, 'folder'))
    
    # 执行重命名
    for old_path, new_path, item_type in rename_list:
        try:
            safe, error_msg = is_safe_to_rename(old_path, new_path)
            if not safe:
                errors.append("{}: {}".format(item_type, error_msg))
                continue
            
            os.rename(old_path, new_path)
            print("已重命名 {}: {} -> {}".format(item_type, os.path.basename(old_path), os.path.basename(new_path)))
            renamed_count += 1
            
        except Exception as e:
            error_msg = "重命名 {} {} 时出错: {}".format(item_type, old_path, e)
            errors.append(error_msg)
            print(error_msg)
    
    # 打印结果
    print("\n重命名完成！")
    print("总项目数: {}".format(total_count + len([item for item in rename_list if item[2] == 'folder'])))
    print("已重命名项目数: {}".format(renamed_count))
    
    if errors:
        print("\n出现 {} 个错误:".format(len(errors)))
        for error in errors:
            print("  - {}".format(error))

def preview_rename(folder_path):
    """预览重命名操作，不实际执行"""
    if not os.path.exists(folder_path):
        print("文件夹不存在: {}".format(folder_path))
        return
    
    print("预览重命名操作:")
    print("-" * 50)
    
    changes_count = 0
    
    for root, dirs, files in os.walk(folder_path, topdown=False):
        # 预览文件重命名
        for file in files:
            new_filename = chinese_to_pinyin_filename(file)
            if file != new_filename:
                print("文件: {} -> {}".format(file, new_filename))
                changes_count += 1
        
        # 预览文件夹重命名
        for dir_name in dirs:
            new_dirname = chinese_to_pinyin_filename(dir_name)
            if dir_name != new_dirname:
                print("文件夹: {} -> {}".format(dir_name, new_dirname))
                changes_count += 1
    
    if changes_count == 0:
        print("没有需要重命名的文件或文件夹")
    else:
        print("\n总共需要重命名 {} 个项目".format(changes_count))

if __name__ == "__main__":
    # 设置asset文件夹路径
    asset_folder = "./asset"  # 根据你的实际路径调整
    
    print("目标文件夹: {}".format(os.path.abspath(asset_folder)))
    
    # 先预览重命名操作
    print("=== 预览模式 ===")
    preview_rename(asset_folder)
    
    # 询问用户是否继续
    user_input = input("\n是否执行重命名操作？(输入 'yes' 继续，其他任意键取消): ")
    
    if user_input.lower() == 'yes':
        print("\n=== 执行重命名 ===")
        rename_files_in_folder(asset_folder)
    else:
        print("操作已取消")