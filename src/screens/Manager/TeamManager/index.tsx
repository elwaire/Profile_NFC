import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loading, Title } from "~/core/components";
import { db } from "~/core/configs/firebase";
import PATHS from "~/core/constants/path";
import { useAppDispatch, useAppSelector } from "~/core/hooks";
import { TeamActions } from "~/core/store";
import { TeamMember } from "~/core/types";
import { renderCloumns } from "./constants";
import "./styles.scss";

const { Search } = Input;

const PAGE_SIZE = 12; // Số lượng card trên mỗi trang

const TeamManager: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const dispatch = useAppDispatch();
    const { loading, listTeam, currentPage, totalMembers } = useAppSelector((state) => state.root.team);

    const fetchMembers = async (page: number, search: string = "") => {
        dispatch(TeamActions.update({ loading: true }));
        try {
            let q = query(collection(db, "teamMembers"), orderBy("name"));

            if (search) {
                q = query(q, where("name", ">=", search), where("name", "<=", search + "\uf8ff"));
            }

            q = query(q, limit(PAGE_SIZE), startAfter((page - 1) * PAGE_SIZE));

            const querySnapshot = await getDocs(q);

            const members: TeamMember[] = [];

            querySnapshot.forEach((doc) => {
                members.push({ id: doc.id, ...doc.data() } as TeamMember);
            });

            dispatch(TeamActions.update({ listTeam: members }));

            // Fetch total count for pagination
            const countSnapshot = await getDocs(query(collection(db, "teamMembers")));
            dispatch(TeamActions.update({ totalMembers: countSnapshot.size }));
        } catch (error) {
            console.error("Error fetching team members:", error);
        } finally {
            dispatch(TeamActions.update({ loading: false }));
        }
    };

    useEffect(() => {
        fetchMembers(currentPage, searchTerm);
    }, [currentPage, searchTerm]);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        dispatch(TeamActions.update({ currentPage: 1 }));
    };

    const handlePageChange = (page: number) => {
        dispatch(TeamActions.update({ currentPage: page }));
    };

    return (
        <div className="team_manager__container">
            {loading && <Loading />}
            <Title title="Team Manager" />
            <div className="team_manager__container__wrapper">
                <div className="team_manager__container__wrapper__group">
                    <Search
                        placeholder="Tìm kiếm thành viên"
                        onSearch={handleSearch}
                        style={{ marginBottom: 16 }}
                        prefix={<SearchOutlined />}
                        className="team_manager__container__wrapper__group__search"
                    />
                    <Link to={PATHS.MANAGER.TEAM.CREATE} className="team_manager__container__wrapper__group__create">
                        <Button type="primary">Add member</Button>
                    </Link>
                </div>

                <Table
                    columns={renderCloumns()}
                    dataSource={listTeam}
                    rowKey="id"
                    pagination={{
                        current: currentPage,
                        pageSize: PAGE_SIZE,
                        total: totalMembers,
                        onChange: (page) => handlePageChange(page),
                    }}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default TeamManager;
